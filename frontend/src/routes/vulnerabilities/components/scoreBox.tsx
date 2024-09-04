import { t } from 'i18next';
import React from 'react';

type ScoreBoxProps = {
  score: number;
  isComplete: boolean;
};

const ScoreBox: React.FC<ScoreBoxProps> = ({ score, isComplete }) => {
  // Determine the background color based on the rating
  let rating: string;
  let bgColor: string;
  if (!isComplete) {
    rating = t('cvss.infoWhenNoScore');
    bgColor = 'bg-gray-500';
  } else if (score < 4) {
    rating = 'Low';
    bgColor = 'bg-yellow-500';
  } else if (score < 7) {
    rating = 'Medium';
    bgColor = 'bg-orange-500';
  } else if (score < 9) {
    rating = 'High';
    bgColor = 'bg-red-500';
  } else {
    rating = 'Critical';
    bgColor = 'bg-red-700';
  }

  return (
    <div
      className={`absolute top-0 w-24 right-0 m-4 rounded-md py-4 text-white font-bold text-center ${bgColor}`}
    >
      <div className="text-2xl">{isComplete ? score : null}</div>
      <div className="text-sm">{rating}</div>
    </div>
  );
};

export default ScoreBox;