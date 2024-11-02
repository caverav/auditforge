import { Text } from '@visx/text';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import { t } from 'i18next';
import React from 'react';

type CWEItem = {
  id: string;
  size: number;
};

type Props = {
  items: CWEItem[];
  mostCommon: string;
};

const fontByDatum = (datum: { value: number }) => {
  return 10 + datum.value * 3;
};

const height = 300;

const itemsToWordDatum = (items: CWEItem[]) => {
  return items.map(item => ({
    text: item.id,
    value: item.size,
  }));
};

export const CWECloud: React.FC<Props> = ({ items, mostCommon }) => {
  if (!items.length) {
    return (
      <p className="text-sm text-gray-500">{t('err.noMatchingRecords')}</p>
    );
  }
  return (
    <div className="bg-gray-900 rounded-lg h-[300px] overflow-hidden">
      <p className="text-sm text-gray-400">Most common: {mostCommon}</p>
      <div className="flex flex-wrap gap-2 justify-center items-center">
        <Wordcloud
          font="Impact"
          fontSize={fontByDatum}
          height={height}
          padding={6}
          random={Math.random}
          rotate={0}
          spiral="rectangular"
          width={100}
          words={itemsToWordDatum(items)}
        >
          {cloudWords =>
            cloudWords.map((w, _) => (
              <Text
                fill="white"
                fontFamily={w.font}
                fontSize={w.size}
                key={w.text}
                textAnchor="middle"
                transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              >
                {w.text}
              </Text>
            ))
          }
        </Wordcloud>
      </div>
    </div>
  );
};
