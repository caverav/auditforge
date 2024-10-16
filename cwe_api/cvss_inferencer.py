import joblib

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
    clf = joblib.load("model.pkl")
    output = clf.predict([vuln])
    output = generate_cvss_string(output_decoded=output[0])
    return output

if __name__ == '__main__':

    vuln = 'Ciertos servidores NFS permiten a los usuarios usar mknod para obtener privilegios creando un dispositivo de kmem escrito y configurando el UID a 0.'
    print(inferencer(vuln))