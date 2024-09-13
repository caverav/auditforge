import jsonData from '../files/desc_cwe_en_es.json';

type CWEData = {
  'CWE-ID': string;
  esp_name: string;
  en_name: string;
};

const GetCWENameByLanguage = (language: string, cweIdToFind: string) => {
  const cweObject: CWEData[] = JSON.parse(jsonData);

  const foundCWE = cweObject.find(item => item['CWE-ID'] === cweIdToFind);

  let traduccion: string;

  if (foundCWE && language.toLowerCase().includes('es')) {
    traduccion = foundCWE.esp_name;
  } else if (foundCWE) {
    traduccion = foundCWE.en_name;
  } else {
    traduccion = 'N/A';
  }

  return traduccion;
};

export default GetCWENameByLanguage;
