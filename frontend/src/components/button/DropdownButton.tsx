import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";

type ListItem = {
  id: number;
  value: string;
  label?: string;
  hrEnabled?: boolean;
};

type SelectDropdownProps = {
  items: ListItem[];
  title?: string;
  onClick: (item: ListItem) => void;
  placeholder?: string;
  end?: boolean;
  color?: "blue" | "red" | "gray";
};

const colorToClassName = {
  blue: {
    button: "bg-blue-800 data-[hover]:bg-blue-700 data-[open]:bg-blue-700",
    dropdown: "bg-blue-900",
  },
  red: {
    button: "bg-rose-800 data-[hover]:bg-rose-700 data-[open]:bg-rose-700",
    dropdown: "bg-rose-900",
  },
  gray: {
    button: "bg-stone-400 data-[hover]:bg-stone-500 data-[open]:bg-stone-500",
    dropdown: "bg-stone-600",
  },
};

const DropdownButton: React.FC<SelectDropdownProps> = ({
  items,
  title,
  onClick,
  placeholder,
  end,
  color = "blue",
}) => {
  const colorClassName = colorToClassName[color];
  return (
    <div>
      <Menu>
        <span className="block text-sm font-medium leading-6 text-gray-300">
          {title}
        </span>
        <div>
          <MenuButton
            className={clsx(
              "inline-flex w-full items-center gap-2 rounded py-2 px-3 font-bold text-white shadow-inner shadow-white/10",
              "focus:outline-none data-[open]:rounded-b-none data-[focus]:outline-1 data-[focus]:outline-white min-h-[2.3rem]",
              `${colorClassName.button}`,
            )}
          >
            <span className="truncate">{placeholder}</span>
            <ChevronDownIcon className="size-4 fill-white/80 ml-3" />
          </MenuButton>
        </div>
        <MenuItems
          anchor={end === true ? "bottom end" : "bottom start"}
          className={clsx(
            "min-w-[var(--button-width)] rounded-b-xl border border-white/5 p-1 p text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]",
            "focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-50",
            `${colorClassName.dropdown}`,
          )}
          transition
        >
          {items.map((item) => (
            <MenuItem key={item.id}>
              {() => (
                <div className="w-full gap-2 rounded-lg data-[focus]:bg-white/10">
                  <button
                    className="w-full group cursor-default text-left items-center py-1.5 px-3 select-none "
                    onClick={() => {
                      onClick(item);
                    }}
                    type="button"
                  >
                    <span className="text-sm/6 text-white">
                      {item.label ? item.label : item.value}
                    </span>
                  </button>
                  {item.hrEnabled ? (
                    <hr className="h-px bg-gray-400 border-0 rounded w-full" />
                  ) : null}
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
