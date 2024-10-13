import jsonData from '../files/desc_cwe_en_es.json';
import parent_to_child from '../files/parent_to_child.json';
const cweObject: CWETranslateType[] = JSON.parse(jsonData);
const typedCWEData: CWEParentChildType[] = parent_to_child;

type CWETranslateType = {
  'CWE-ID': string;
  esp_name: string;
  en_name: string;
};

type CWEParentChildType = {
  id: number;
  parent_id: null | number;
  name: string;
  children?: CWEParentChildType[];
};

type CWERelated = {
  cwe: string;
  cweParent?: string;
  cweGrandParent?: string;
};

type CWERelatedObjects = {
  cwe: CWETranslateType;
  cweParent?: CWETranslateType;
  cweGrandParent?: CWETranslateType;
};

type CWENumbers = {
  priority: number;
  label: string;
  score: number;
};

const GetCWENameByLanguage = (language: string, cweDataArray: CWENumbers[]) => {
  const findByNameRecursive = (
    data: CWEParentChildType[],
    nameToFind: string,
  ): CWEParentChildType | undefined => {
    for (const item of data) {
      if (item.name === nameToFind) {
        return item;
      }
      if (item.children) {
        const foundInChildren = findByNameRecursive(item.children, nameToFind);
        if (foundInChildren) {
          return foundInChildren;
        }
      }
    }
    return undefined;
  };

  const CWERelateds: CWERelated[] = cweDataArray.map(item => ({
    cwe: item.label,
  }));

  CWERelateds.forEach(item => {
    const foundCWE = findByNameRecursive(typedCWEData, item.cwe);
    if (foundCWE && foundCWE.parent_id !== null) {
      const parentName = `CWE-${foundCWE.parent_id}`;
      item.cweParent = parentName;
      const parent = findByNameRecursive(typedCWEData, parentName);
      if (parent && parent.parent_id !== null) {
        item.cweGrandParent = `CWE-${parent.parent_id}`;
      }
    }
  });

  const cweObjects: CWERelatedObjects[] = CWERelateds.map(item => {
    const foundCWE: CWERelatedObjects = {
      cwe: cweObject.find(itemIter => itemIter['CWE-ID'] === item.cwe) ?? {
        'CWE-ID': '',
        esp_name: '',
        en_name: '',
      },
    };
    if (item.cweParent) {
      foundCWE.cweParent = cweObject.find(
        itemIter => itemIter['CWE-ID'] === item.cweParent,
      ) ?? {
        'CWE-ID': '',
        esp_name: '',
        en_name: '',
      };
    }
    if (item.cweGrandParent) {
      foundCWE.cweGrandParent = cweObject.find(
        itemIter => itemIter['CWE-ID'] === item.cweGrandParent,
      ) ?? {
        'CWE-ID': '',
        esp_name: '',
        en_name: '',
      };
    }
    return foundCWE;
  });

  let traduccion: CWERelated[];

  if (language.toLowerCase().includes('es')) {
    traduccion = cweObjects.map(item => {
      const result: CWERelated = {
        cwe: `${item.cwe['CWE-ID']}: ${item.cwe.esp_name}`,
      };
      if (item.cweParent?.esp_name) {
        result.cweParent = `${item.cweParent['CWE-ID']}: ${item.cweParent.esp_name}`;
      }
      if (item.cweGrandParent?.esp_name) {
        result.cweGrandParent = `${item.cweGrandParent['CWE-ID']}: ${item.cweGrandParent.esp_name}`;
      }
      return result;
    });
  } else {
    traduccion = cweObjects.map(item => {
      const result: CWERelated = {
        cwe: `${item.cwe['CWE-ID']}: ${item.cwe.en_name}`,
      };
      if (item.cweParent?.en_name) {
        result.cweParent = `${item.cweParent['CWE-ID']}: ${item.cweParent.en_name}`;
      }
      if (item.cweGrandParent?.en_name) {
        result.cweGrandParent = `${item.cweGrandParent['CWE-ID']}: ${item.cweGrandParent.en_name}`;
      }
      return result;
    });
  }

  return traduccion;
};

export default GetCWENameByLanguage;
