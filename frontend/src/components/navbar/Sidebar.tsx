import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * **name**: Traducción.
 *
 * **value**: Valor del item para hacer el `<Link/>`.
 *
 * **id**: Valor entero único para identificar al item.
 */
interface listItem {
  name: string;
  value: string;
  id: number;
}

interface SidebarProps {
  items: listItem[];
  title: string;
  defaultItem: listItem;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  title,
  defaultItem,
}) => {
  const [selected, setSelected] = useState(defaultItem.value);
  return (
    <div className="w-64 h-screen bg-gray-700 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <nav>
        <ul>
          {items.map((item) => (
            <div key={item.id}>
              <Link to={item.value}>
                <li
                  onClick={() => setSelected(item.value)}
                  className={`p-4 hover:bg-gray-600 cursor-pointer ${item.value == selected ? "bg-gray-600" : ""}`}
                >
                  <div>{item.name}</div>
                </li>
              </Link>
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
};