import { Checkbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/16/solid';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

type CWERelated = {
  cwe: string;
  cweParent?: string;
  cweGrandParent?: string;
};

export type CheckboxButtonProps = {
  cwesRecommended: CWERelated[];
  cweRecommendationSelected: string[];
  setCweRecommendationSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

// Returns an object with the total number of properties in the CWE array and an array with the number of properties accumulated in each CWE object
const countPropertiesInCWEArray = (
  arr: CWERelated[],
): {
  total: number;
  breakdown: number[];
} => {
  let accumulatedTotal = 0;

  const keys: (keyof CWERelated)[] = ['cwe', 'cweParent', 'cweGrandParent'];
  const breakdown = arr.map(item => {
    const count = keys.reduce((sum, key) => sum + (item[key] ? 1 : 0), 0);

    const currentTotal = accumulatedTotal;
    accumulatedTotal += count;

    return currentTotal;
  });

  const total = accumulatedTotal;
  return { total, breakdown };
};

const MultiCheckboxButton = ({
  cwesRecommended,
  cweRecommendationSelected,
  setCweRecommendationSelected,
}: CheckboxButtonProps) => {
  const countProperties = countPropertiesInCWEArray(cwesRecommended);
  const [selectedBox, setSelectedBox] = useState<boolean[]>(
    Array(countProperties.total).fill(false),
  );

  useEffect(() => {
    if (cweRecommendationSelected.length === 0) {
      setSelectedBox(Array(countProperties.total).fill(false));
    }
  }, [cweRecommendationSelected.length, countProperties.total]);

  const allStrings: string[] = cwesRecommended.flatMap(item => {
    const { cwe, cweParent, cweGrandParent } = item;
    return [cwe, cweParent, cweGrandParent].filter((value): value is string =>
      Boolean(value),
    );
  });

  const [showAncestors, setShowAncestors] = useState<boolean[]>(
    Array(cwesRecommended.length).fill(false),
  );

  const onChange = (index: number) => {
    const values = selectedBox.map((itemMap, i) =>
      i === index ? !itemMap : itemMap,
    );
    setSelectedBox(values);

    const selectedOptions = allStrings.filter((_, index) => values[index]);

    setCweRecommendationSelected([...selectedOptions]);
  };

  const handlerOnClick = (index: number) => {
    setShowAncestors(
      showAncestors.map((item, i) => (i === index ? !item : item)),
    );
  };

  return (
    <div>
      <span className="text-2xl">{t('recommendedCwe')}:</span>
      <div className="flex flex-col items-center my-3">
        {cwesRecommended.map((option: CWERelated, index: number) => (
          <div
            className={`w-full flex-col items-center ${index !== 0 ? 'mt-6' : ''} p-2 border border-white rounded-md`}
            key={`${index}`}
          >
            <div className="flex justify-between">
              <div className="w-full flex items-center my-1">
                <Checkbox
                  checked={selectedBox[countProperties.breakdown[index]]}
                  className="group flex items-center justify-center size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
                  onChange={() => onChange(countProperties.breakdown[index])}
                >
                  <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
                </Checkbox>
                <div className="ml-2">
                  <p className="text-md text-gray-200">{option.cwe}</p>
                </div>
              </div>
              <button
                className="underline font-bold cursor-pointer bg-transparent border-none p-0 m-0"
                onClick={() => handlerOnClick(index)}
                type="button"
              >
                {showAncestors[index] ? t('hideAncestors') : t('showAncestors')}
              </button>
            </div>
            {showAncestors[index] ? (
              <div>
                {option.cweParent ? (
                  <div className="w-full flex items-center mt-4 pl-10">
                    <Checkbox
                      checked={
                        selectedBox[countProperties.breakdown[index] + 1]
                      }
                      className="group flex items-center justify-center size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
                      onChange={() =>
                        onChange(countProperties.breakdown[index] + 1)
                      }
                    >
                      <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
                    </Checkbox>
                    <div className="ml-2">
                      <p className="text-md text-gray-200">
                        {option.cweParent}
                      </p>
                    </div>
                  </div>
                ) : null}
                {option.cweGrandParent ? (
                  <div className="w-full flex items-center mt-5 pl-20">
                    <Checkbox
                      checked={
                        selectedBox[countProperties.breakdown[index] + 2]
                      }
                      className="group flex items-center justify-center size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
                      onChange={() =>
                        onChange(countProperties.breakdown[index] + 2)
                      }
                    >
                      <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
                    </Checkbox>
                    <div className="ml-2">
                      <p className="text-md text-gray-200">
                        {option.cweGrandParent}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiCheckboxButton;
