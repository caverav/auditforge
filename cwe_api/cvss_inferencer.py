import torch
import torch.nn as nn
from transformers import BertTokenizer, BertModel
from torch.utils.data import Dataset, DataLoader
import logging
import re
import pickle

DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'
OUTPUTS_NAME = ['attackVector', 'attackComplexity', 'privilegesRequired', 'userInteraction', 
           'scope', 'confidentialityImpact', 'integrityImpact', 'availabilityImpact', 'baseSeverity']

NUM_LABELS_PATH = 'utils/num_labels.pickle'
MODEL_PATH = 'utils/cvss.pth'

def set_global_logging_level(level=logging.ERROR, prefices=[""]):
    """
    Override logging levels of different modules based on their name as a prefix.
    It needs to be invoked after the modules have been loaded so that their loggers have been initialized.

    Args:
        - level: desired level. e.g. logging.INFO. Optional. Default is logging.ERROR
        - prefices: list of one or more str prefices to match (e.g. ["transformers", "torch"]). Optional.
          Default is `[""]` to match all active loggers.
          The match is a case-sensitive `module_name.startswith(prefix)`
    """
    prefix_re = re.compile(fr'^(?:{ "|".join(prefices) })')
    for name in logging.root.manager.loggerDict:
        if re.match(prefix_re, name):
            logging.getLogger(name).setLevel(level)

class MultiOutputBert(nn.Module):
    def __init__(self, num_labels):
        super(MultiOutputBert, self).__init__()
        self.bert = BertModel.from_pretrained('distilbert/distilbert-base-multilingual-cased')
        self.dropout = nn.Dropout(0.3)
        
        self.classifiers = nn.ModuleDict({
            output: nn.Linear(self.bert.config.hidden_size, num_labels[output]) for output in OUTPUTS_NAME
        })

    def forward(self, input_ids, attention_mask):
        bert_outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        cls_output = bert_outputs.pooler_output  # Get the CLS token output
        cls_output = self.dropout(cls_output)
        
        # Apply classifier for each output
        output_logits = {output: classifier(cls_output) for output, classifier in self.classifiers.items()}
        return output_logits
    
class MultiOutputDataset(Dataset):
    def __init__(self, encodings):
        self.encodings = encodings
        # self.labels = labels

    def __getitem__(self, idx):
        item = {key: val[idx].clone().detach() for key, val in self.encodings.items()}
        # label_item = {output: self.labels[output][idx] for output in outputs}
        return item

    def __len__(self):
        return len(self.encodings['input_ids'])

def generate_dataset(vuln):

    tokenizer = BertTokenizer.from_pretrained('distilbert/distilbert-base-multilingual-cased')
    encodings = tokenizer(list(vuln), truncation=True, padding=True, max_length=256, return_tensors='pt')

    vuln = MultiOutputDataset(encodings)

    dataloader = DataLoader(vuln, batch_size=1)

    return dataloader

def decode_output(outputs):

    output_decoded = []

    for index, i in enumerate(outputs.values()):

        with open(f'utils/encoder_{OUTPUTS_NAME[index]}.pickle', 'rb') as handle:
            encoder = pickle.load(handle)

        data = [i.argmax().cpu().numpy()]
        
        output_decoded.append(encoder.inverse_transform(data)[0])

    return output_decoded

def generate_cvss_string(output_decoded):

    output_decoded = output_decoded[:-1]

    pair_name2letter = {'AV': {'NETWORK': 'N', 'ADJACENT': 'A', 'LOCAL': 'L', 'PHYSICAL': 'P'},
                        'AC': {'LOW': 'L', 'HIGH': 'H'},
                        'PR': {'NONE': 'N', 'LOW': 'L', 'HIGH': 'H'},
                        'UI': {'NONE': 'N', 'REQUIRED': 'R'},
                        'S': {'UNCHANGED': 'U', 'CHANGED': 'C'},
                        'C': {'NONE': 'N', 'LOW':'L', 'HIGH': 'H'},
                        'I': {'NONE': 'N', 'LOW': 'L', 'HIGH':'H'},
                        'A': {'NONE':'N', 'LOW':'L', 'HIGH':'H'}}
    
    cvss_string = 'CVSS:3.1/'
    pair_name = list(pair_name2letter.keys())

    for index, output in enumerate(output_decoded):

        cvss_string += pair_name[index] + ':' + pair_name2letter[pair_name[index]][output]

        if index != 7:
            cvss_string += '/'

    return cvss_string


def inferencer(vuln):

    set_global_logging_level(logging.ERROR, ["transformers", "nlp", "torch", "tensorflow", "tensorboard", "wandb"])

    with open(NUM_LABELS_PATH, 'rb') as handle:
        num_labels = pickle.load(handle)

    model = MultiOutputBert(num_labels).to(DEVICE)

    model.load_state_dict(torch.load(MODEL_PATH, weights_only=True))
    model.eval()

    dataloader = generate_dataset(vuln)

    with torch.no_grad():
        for index, batch in enumerate(dataloader):
            input_data = batch
            input_ids = input_data['input_ids'].to(DEVICE)
            attention_mask = input_data['attention_mask'].to(DEVICE)
            
            outputs = model(input_ids=input_ids, attention_mask=attention_mask)

    output_decoded = decode_output(outputs)
    cvss_string = generate_cvss_string(output_decoded)
    return cvss_string

if __name__ == '__main__':

    vuln = 'Ciertos servidores NFS permiten a los usuarios usar mknod para obtener privilegios creando un dispositivo de kmem escrito y configurando el UID a 0.'
    print(inferencer(vuln))