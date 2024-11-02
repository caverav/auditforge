import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import React from 'react';
import { Text } from '@visx/text';

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
  return (
    <div className="bg-gray-900 p-6 rounded-lg h-[300px] overflow-hidden">
      <p className="text-sm text-gray-400 mb-4">Most common: {mostCommon}</p>
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
            cloudWords.map((w, i) => (
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
