import React from 'react';

const Collaborators: React.FC = () => {
  const collaborators = [
    { name: 'Camilo', findings: 18 },
    { name: 'José Llanos', findings: 12 },
    { name: 'Sebastian Alvarado', findings: 8 },
    { name: 'Ricardo Olalquiaga', findings: 5 },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Collaborators Leaderboard</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left py-2">#</th>
            <th className="text-left py-2">Name</th>
            <th className="text-left py-2">Findings</th>
          </tr>
        </thead>
        <tbody>
          {collaborators.map((collaborator, index) => (
            <tr className="border-t border-gray-700" key={index}>
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{collaborator.name}</td>
              <td className="py-2">{collaborator.findings} findings</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Collaborators;
