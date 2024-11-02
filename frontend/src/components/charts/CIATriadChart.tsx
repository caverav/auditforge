import React from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

type CIAData = {
  subject: string;
  current: number;
  target: number;
};

type Props = {
  data: CIAData[];
};

export const CIATriadChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <h3 className="text-lg font-semibold mb-4">Average CIA triad</h3>
      <ResponsiveContainer height="100%" width="100%">
        <RadarChart cx="50%" cy="50%" data={data} outerRadius="80%">
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar
            dataKey="current"
            fill="#ff4d4d"
            fillOpacity={0.5}
            name="Current"
            stroke="#ff4d4d"
          />
          <Radar
            dataKey="target"
            fill="#82ca9d"
            fillOpacity={0.5}
            name="Target"
            stroke="#82ca9d"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
