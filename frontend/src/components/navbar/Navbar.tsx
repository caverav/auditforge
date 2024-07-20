import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, CogIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import { useTranslation } from "react-i18next";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { t } = useTranslation();
  const navigationOptions = [
    { name: t('nav.audits'), href: '/audits', current: true },
    { name: t('nav.vulnerabilities'), href: '/vulnerabilities', current: false },
    { name: t('nav.data'), href: '/data', current: false },
  ]
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <Disclosure as="nav" className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Logo"
                src="/auditforgelogo.png"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigationOptions.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.href === location.pathname ? 'page' : undefined}
                    className={classNames(
                      item.href === location.pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              to='/settings'
              title={t('settings')}
              className={classNames('/settings' === location.pathname ? 'bg-gray-900' : 'text-gray-400 hover:bg-gray-700', "relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white")}
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">{t('settings')}</span>
              <CogIcon aria-hidden="true" className="h-8 w-auto" />
            </Link> 

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="text-gray-400 h-8 w-auto" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a href="" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    {t('profile')}
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    {t('settings')}
                  </a>
                </MenuItem>
                <MenuItem>
                  <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100" onClick={() => logout()}>
                    {t('logout')}
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigationOptions.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.href === location.pathname ? 'page' : undefined}
              className={classNames(
                item.href === location.pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
