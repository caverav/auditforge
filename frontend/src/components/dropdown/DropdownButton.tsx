import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

interface ListItem {
  id: number;
  value: string;
  label?: string;
  hrEnabled?: boolean;
}

interface SelectDropdownProps {
  items: ListItem[];
  title?: string;
  onClick: (item: ListItem) => void;
  placeholder?: string;
  end?: boolean;
}

const DropdownButton: React.FC<SelectDropdownProps> = ({
  items,
  title,
  onClick,
  placeholder,
  end,
}) => {
  return (
    <div>
      <Menu>
        <span className={"block text-sm font-medium leading-6 text-gray-300"}>
          {title}
        </span>
        <div>
          <MenuButton
            className={clsx(
              "inline-flex w-full items-center gap-2 rounded bg-blue-800 py-2 px-3 font-bold text-white shadow-inner shadow-white/10",
              "focus:outline-none data-[hover]:bg-blue-700 data-[open]:bg-blue-700 data-[open]:rounded-b-none data-[focus]:outline-1 data-[focus]:outline-white min-h-[2.3rem]",
            )}
          >
            <span className="truncate">{placeholder}</span>
            <ChevronDownIcon className="size-4 fill-white/80 ml-3" />
          </MenuButton>
        </div>
        <MenuItems
          transition
          anchor={end === true ? "bottom end" : "bottom start"}
          className={clsx(
            "rounded-b-xl border border-white/5 bg-blue-900 p-1 p text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]",
            "focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-50",
          )}
        >
          {items.map((item) => (
            <MenuItem key={item.id}>
              {() => (
                <div className="w-full gap-2 rounded-lg data-[focus]:bg-white/10">
                  <button
                    onClick={() => {
                      onClick(item);
                    }}
                    className="w-full group cursor-default text-left items-center py-1.5 px-3 select-none "
                  >
                    <span className="text-sm/6 text-white">
                      {item.label ? item.label : item.value}
                    </span>
                  </button>
                  {item.hrEnabled ? (
                    <hr className="h-px bg-gray-400 border-0 rounded w-full" />
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default DropdownButton;
