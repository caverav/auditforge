import React from 'react';

type SidebarProps = {
  setActiveView: (view: string) => void;
  activeView: string;
};

const Sidebar: React.FC<SidebarProps> = ({ setActiveView, activeView }) => {
  const menuItems = [
    { name: 'CVSS Score', id: 'cvss-score' },
    { name: 'Remediation Priority', id: 'remediation-priority' },
    { name: 'Remediation Complexity', id: 'remediation-complexity' },
    { name: 'CWEs', id: 'cwes' },
    { name: 'Collaborators', id: 'collaborators' },
    { name: 'Average CVSS', id: 'average-cvss' },
    { name: 'CIA Triad', id: 'cia-triad' },
  ];

  return (
    <aside className="w-64 bg-gray-800 p-4">
      <h2 className="text-xl font-bold mb-6">Select data display</h2>
      <nav>
        <ul>
          {menuItems.map(item => (
            <li className="mb-2" key={item.id}>
              <button
                className={`sidebar-item block ${activeView === item.id ? 'bg-blue-600' : ''}`}
                onClick={() => setActiveView(item.id)}
                type="button"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
