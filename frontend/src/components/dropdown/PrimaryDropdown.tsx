import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type ListItem = {
  href: string;
  label: string;
};

type PrimaryDropdownProps = {
  items: ListItem[];
  title: string;
};
/**
 * ### [WIP] No utilizar!!
 */
const PrimaryDropdown: React.FC<PrimaryDropdownProps> = ({ items, title }) => {
  return (
    <Menu>
      <MenuButton className="w-52 inline-flex justify-between items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
        {title}
        <ChevronDownIcon className="group pointer-events-none top-2.5 right-2.5 size-4 fill-white/60" />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="w-52 origin-top-right rounded-xl border border-white/5 bg-stone-800 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {items.map(item => (
          <MenuItem key={item.href}>
            <a
              className="group flex w-auto items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white"
              href={item.href}
            >
              {item.label}
            </a>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default PrimaryDropdown;
