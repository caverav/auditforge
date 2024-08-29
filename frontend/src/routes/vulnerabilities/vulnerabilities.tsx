import { useState } from 'react';

import MultiSelectDropdown from '../../components/dropdown/MultiSelectDropdown';

type ListItem = {
  id: number;
  value: string;
  label?: string;
};
export const Vulnerabilities = () => {
  const initialItems = [
    { id: 1, label: 'opt 1', value: '1' },
    { id: 2, label: 'opt 2', value: '2' },
    { id: 3, label: 'opt 3', value: '3' },
  ];

  const newItems = [
    { id: 4, label: 'opt 16', value: '16' },
    { id: 5, label: 'opt 17', value: '17' },
    { id: 6, label: 'opt 18', value: '18' },
  ];

  const [items, setItems] = useState<ListItem[]>(initialItems);

  const [selected, setSelected] = useState<ListItem[]>([]);

  return (
    <div className="p-4">
      <MultiSelectDropdown
        items={items}
        onChange={i => setSelected(i)}
        selected={selected}
        title="titulo"
      />
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => setItems(newItems)}
        type="button"
      >
        click
      </button>
      <br />
      {JSON.stringify(items)}
      <br />
      {JSON.stringify(selected)}
    </div>
  );
};
