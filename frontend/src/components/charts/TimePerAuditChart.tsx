import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type AuditTime = {
  name: string;
  execution: number;
  remediation: number;
};

type Props = {
  data: AuditTime[];
};

export const TimePerAuditChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <h3 className="text-lg font-semibold mb-4">Times per audit</h3>
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="execution" fill="#82ca9d" name="Time of execution" />
          <Bar
            dataKey="remediation"
            fill="#8884d8"
            name="Time of remediation"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
