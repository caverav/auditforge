import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

type SeverityData = {
  name: string;
  value: number;
  color: string;
};

type Props = {
  data: SeverityData[];
  total: number;
};

export const SeverityPieChart: React.FC<Props> = ({ data, total }) => {
  return (
    <div className="h-[300px] w-full">
      <h3 className="text-lg font-semibold mb-2">
        Vulnerabilities by severity
      </h3>
      <p className="text-sm text-gray-500 mb-4">{total} found in total</p>
      <ResponsiveContainer height="100%" width="100%">
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell fill={entry.color} key={`cell-${index}`} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
