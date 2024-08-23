import { Users, ChevronUp, ChevronDown } from "lucide-react";
import clsx from "clsx";
import DefaultRadioGroup from "../button/DefaultRadioGroup";
import SelectDropdown from "../dropdown/SelectDropdown";
import { Link } from "react-router-dom";
import { t } from "i18next";
interface MenuItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  additionalIcon?: React.ComponentType<{ className?: string }>;
}

interface Finding {
  id: number;
  name: string;
  category: string;
  severity: string;
}

interface SortOption {
  id: number;
  value: string;
}

interface SortOrderOption {
  id: string;
  label: string;
  value: string;
}

interface ConnectedUser {
  id: number;
  name: string;
  online: boolean;
}

interface AuditSidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  sortBy: SortOption | null;
  setSortBy: (option: SortOption | null) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  menuItems: MenuItem[];
  findings: Finding[];
  sortOptions: SortOption[];
  sortOrderOptions: SortOrderOption[];
  connectedUsers: ConnectedUser[];
}

export default function AuditSidebar({
  activeItem,
  setActiveItem,
  isCollapsed,
  setIsCollapsed,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  menuItems,
  findings,
  sortOptions,
  sortOrderOptions,
  connectedUsers,
}: AuditSidebarProps) {
  return (
    <div
      className={clsx(
        "flex flex-col h-screen bg-gray-900 text-gray-100 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2
          className={clsx(
            "font-semibold transition-opacity",
            isCollapsed ? "opacity-0 w-0" : "opacity-100",
          )}
        >
          {t("audit")}
        </h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="text-gray-400 hover:text-gray-100 hover:bg-gray-800 p-2 rounded-full transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.value}
                className={clsx(
                  "w-full flex items-center justify-start gap-3 px-4 py-2 text-left text-sm font-medium rounded-lg transition-colors duration-200",
                  "hover:bg-gray-800",
                  activeItem === item.name
                    ? "bg-gray-800 text-white"
                    : "text-gray-400",
                )}
                onClick={() => {
                  setActiveItem(item.name);
                }}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span
                  className={clsx(
                    "flex-1 transition-opacity",
                    isCollapsed && "opacity-0 w-0 overflow-hidden",
                  )}
                >
                  {item.name}
                </span>
                {item.additionalIcon && (
                  <item.additionalIcon
                    className={clsx(
                      "h-4 w-4",
                      isCollapsed ? "ml-0" : "ml-auto",
                    )}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
        <div className={clsx("mt-4 px-4", isCollapsed && "px-2")}>
          <div className={clsx("mb-2", isCollapsed && "sr-only")}>
            <SelectDropdown
              items={sortOptions}
              title={t("sortBy")}
              selected={sortBy}
              onChange={setSortBy}
              placeholder={t("select")}
            />
          </div>
          <div className={clsx("mb-4 font-thin", isCollapsed && "sr-only")}>
            <DefaultRadioGroup
              name="sortOrder"
              options={sortOrderOptions}
              value={sortOrder}
              onChange={setSortOrder}
            />
          </div>
          <ul className="space-y-2">
            {findings.map((finding) => (
              <li key={finding.id} className="flex items-center gap-2 text-sm">
                <span className="w-6 h-6 flex items-center justify-center bg-green-600 text-white rounded-full font-medium">
                  {finding.severity}
                </span>
                <span
                  className={clsx("text-gray-300", isCollapsed && "sr-only")}
                >
                  {finding.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="mb-2">
          <button className="w-full flex items-center justify-start gap-3 text-gray-400 hover:text-gray-100 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors duration-200">
            <Users className="h-5 w-5 flex-shrink-0" />
            <span
              className={clsx(
                "transition-opacity",
                isCollapsed && "opacity-0 w-0 overflow-hidden",
              )}
            >
              {t("usersConnected")}
            </span>
          </button>
        </div>
        <ul className="space-y-2">
          {connectedUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center gap-2 text-sm px-4 py-1"
            >
              <span
                className={clsx(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  user.online ? "bg-green-500" : "bg-gray-500",
                )}
              />
              <span className={clsx("text-gray-300", isCollapsed && "sr-only")}>
                {user.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
