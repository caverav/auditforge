import { useEffect, useState } from 'react';

type CWERelated = {
  cwe: string;
  cweParent?: string;
  cweGrandParent?: string;
};

type ListItem = {
  id: number;
  value: string;
  label?: string;
  locale?: string;
};

type ListItemCategory = {
  id: number;
  value: string;
  label?: string;
  isNull?: boolean;
};

type Details = {
  locale: string;
  title?: string;
  vulnType?: string;
  description?: string;
  observation?: string;
  remediation?: string;
  cwes: string[];
  references: string[];
  customFields: string[];
};

type VulnerabilityData = {
  _id: string;
  cvssv3: string | null;
  priority?: number | '';
  remediationComplexity?: number | '';
  details: Details[];
  status?: number;
  category?: string | null;
  __v: number;
  createdAt?: string;
  updatedAt?: string;
};

type UseVulnStateProps = {
  currentVuln: VulnerabilityData; // Adjust this type based on the shape of `currentVuln`
  languages: ListItem[];
  types: ListItem[];
};

export const useVulnState = ({
  currentVuln,
  languages,
  types,
}: UseVulnStateProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [changed, setChanged] = useState<boolean>(false);

  const [categorySelected, setCategorySelected] =
    useState<ListItemCategory | null>(null);
  const [categoryChanged, setCategoryChanged] = useState<boolean>(false);

  const [selectedLanguage, setSelectedLanguage] = useState<ListItem>(
    languages.find(lang => lang.value === currentVuln.details[0].locale) ??
      languages[0],
  );

  const [selectedType, setSelectedType] = useState<ListItem | null>(
    currentVuln.details[0].vulnType
      ? (types.find(
          typeIter => typeIter.value === currentVuln.details[0].vulnType,
        ) ?? null)
      : null,
  );

  const [typesFiltered, setTypesFiltered] = useState<ListItem[]>(
    types.filter(typeIter => typeIter.locale === currentVuln.details[0].locale),
  );

  const [cweLoading, setCweLoading] = useState<boolean>(false);
  const [cweRecommendationSelected, setCweRecommendationSelected] = useState<
    string[]
  >([]);
  const [cweRecommended, setCweRecommended] = useState<CWERelated[]>([]);

  useEffect(() => {
    // Update filtered types when the language changes
    setTypesFiltered(
      types.filter(typeIter => typeIter.locale === selectedLanguage.value),
    );
  }, [selectedLanguage, types]);

  return {
    openModal,
    setOpenModal,
    changed,
    setChanged,
    categorySelected,
    setCategorySelected,
    categoryChanged,
    setCategoryChanged,
    selectedLanguage,
    setSelectedLanguage,
    selectedType,
    setSelectedType,
    typesFiltered,
    setTypesFiltered,
    cweLoading,
    setCweLoading,
    cweRecommendationSelected,
    setCweRecommendationSelected,
    cweRecommended,
    setCweRecommended,
  };
};
