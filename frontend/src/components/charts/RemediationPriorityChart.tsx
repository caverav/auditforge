import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type PriorityData = {
  name: string;
  count: number;
  color: string;
};

type Props = {
  data: PriorityData[];
};

export const RemediationPriorityChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {data.map((entry, index) => (
            <Bar dataKey="count" fill={entry.color} key={index} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
