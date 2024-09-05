import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  CogIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

const Navbar = (): JSX.Element => {
  const { logout } = useAuth();
  const { t } = useTranslation();
  const navigationOptions = [
    { name: t('nav.audits'), href: '/audits', current: true },
    {
      name: t('nav.vulnerabilities'),
      href: '/vulnerabilities',
      current: false,
    },
    { name: t('nav.data'), href: '/data', current: false },
  ];
  const location = useLocation();

  return (
    <Disclosure as="nav" className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Logo"
                className="h-8 w-auto"
                src="/auditforgelogo.png"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigationOptions.map(item => (
                  <Link
                    aria-current={
                      item.href === location.pathname ? 'page' : undefined
                    }
                    className={classNames(
                      item.href === location.pathname
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                    key={item.name}
                    to={item.href}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              className={classNames(
                '/settings' === location.pathname
                  ? 'bg-gray-900'
                  : 'text-gray-400 hover:bg-gray-700',
                'relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white',
              )}
              title={t('settings')}
              to="/settings"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">{t('settings')}</span>
              <CogIcon aria-hidden="true" className="h-8 w-auto" />
            </Link>
            <Link
              className={classNames(
                '/profile' === location.pathname
                  ? 'bg-gray-900'
                  : 'text-gray-400 hover:bg-gray-700',
                'relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white mx-2',
              )}
              title={t('profile')}
              to="/profile"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">{t('profile')}</span>
              <UserCircleIcon aria-hidden="true" className="h-8 w-auto" />
            </Link>
            <button
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
              onClick={logout}
              title={t('logout')}
              type="button"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">{t('logout')}</span>
              <ArrowRightStartOnRectangleIcon
                aria-hidden="true"
                className="h-8 w-auto"
              />
            </button>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigationOptions.map(item => (
            <DisclosureButton
              aria-current={
                item.href === location.pathname ? 'page' : undefined
              }
              as="a"
              className={classNames(
                item.href === location.pathname
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
              href={item.href}
              key={item.name}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
