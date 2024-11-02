import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type CVSSData = {
  name: string;
  score: number;
};

type Props = {
  data: CVSSData[];
};

export const CVSSChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <h3 className="text-lg font-semibold mb-4">Average CVSS</h3>
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis domain={[0, 10]} type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <ReferenceLine label="Average CVSS 5.0" stroke="#666" x={5} />
          <Bar dataKey="score" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
