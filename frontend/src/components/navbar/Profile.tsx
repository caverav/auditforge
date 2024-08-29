import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { t } from 'i18next';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

export const ProfileDropdown = () => {
  const { logout } = useAuth();
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <UserCircleIcon className="text-gray-400 h-8 w-auto" />
        </MenuButton>
      </div>
      <MenuItems
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        transition
      >
        <MenuItem>
          <Link
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
            to="/profile"
          >
            {t('profile')}
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
            to="/settings"
          >
            {t('settings')}
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
            onClick={() => logout()}
            type="button"
          >
            {t('logout')}
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};
