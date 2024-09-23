import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactElement, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

type SidebarItem = {
  name: string;
  value: string;
  id: number;
  icon?: ReactElement;
};

type SidebarProps = {
  title: string;
  items: SidebarItem[];
};

export const Sidebar = ({ title, items }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`relative ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out`}
    >
      <div className="fixed h-full bg-gray-900 text-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          {isOpen ? <h2 className="text-xl font-semibold">{title}</h2> : null}
          <button
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            onClick={toggleSidebar}
            type="button"
          >
            {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            {items.map(item => (
              <li key={item.id}>
                <Link
                  className={`flex items-center px-4 py-2 text-sm ${
                    location.pathname === `/data/${item.value}`
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  } transition-colors`}
                  to={`/data/${item.value}`}
                >
                  {isOpen
                    ? item.name
                    : (item.icon ?? (
                        <span className="tooltip group">
                          {item.name.charAt(0).toUpperCase()}
                          <span className="tooltiptext">{item.name}</span>
                        </span>
                      ))}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
