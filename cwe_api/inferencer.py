from transformers import TextClassificationPipeline
from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification
from torch import nn
import json
import numpy as np

ID2LABEL_PATH = './id2label.json'
LABEL2ID_PATH = './label2id.json'
MODEL_PATH = "./modelo_cwe/checkpoint-141693"
NUMBER_OF_PREDICTIONS = 3

class BestCweClassifications(TextClassificationPipeline):
    def postprocess(self, model_outputs):
        best_class = model_outputs["logits"]
        return best_class

def inferencer(vuln):

    with open(ID2LABEL_PATH) as f:
        id2label = json.load(f)
        
    with open(LABEL2ID_PATH) as f:
        label2id = json.load(f)

    tokenizer = AutoTokenizer.from_pretrained("distilbert/distilbert-base-multilingual-cased")
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH,
                                                                num_labels=len(label2id),
                                                                id2label=id2label,
                                                                label2id=label2id)
    
    m = nn.Softmax(dim=1)

    pipe = BestCweClassifications(model=model, tokenizer=tokenizer)
    output = pipe(vuln, batch_size=2, truncation="only_first")
    
    softmax_output = m(output[0])[0]
    ind = np.argpartition(softmax_output, -NUMBER_OF_PREDICTIONS)[-NUMBER_OF_PREDICTIONS:]

    reversed_indices = np.flip(ind.numpy(),0).copy()
    score = softmax_output[reversed_indices]

    return [{'priority': i, 'label': id2label[str(reversed_indices[i])], 'score': float(score[i].numpy())} for i in range(0, 3)]

