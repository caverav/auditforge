import React from 'react';

interface ScoreBoxProps {
  score: number | undefined;
}

const ScoreBox: React.FC<ScoreBoxProps> = ({ score }) => {
  // Determine the background color based on the rating
  let bgColor = '';
  let rating = '';
  if ((score && score < 4) || score === 0) {
    bgColor = 'bg-yellow-500';
    rating = 'Low'
  } else if (score && score < 7) {
    bgColor = 'bg-orange-500'; 
    rating = 'Medium'
  } else if (score){
    bgColor = 'bg-red-500'; 
    rating = 'High'
  } else if (score){
    bgColor = 'bg-gray';
    rating = '???'
  }

  return (
    <div className={`absolute top-0 right-0 m-4 rounded-md p-4 text-white font-bold text-center ${bgColor}`}>
      <div className="text-2xl">{score}</div>
      <div className="text-sm">{rating}</div>
    </div>
  );
};

export default ScoreBox;