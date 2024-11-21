import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Jobs', href: '/jobs', current: false },
    ...(user ? [{ name: 'Applications', href: '/applications', current: false }] : []),
  ];

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0 flex items-center"
                >
                  <Link to="/" className="text-2xl font-bold text-primary-600">
                    JobFair360
                  </Link>
                </motion.div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -2 }}
                      className="inline-flex items-center"
                    >
                      <Link
                        to={item.href}
                        className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary-600"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {user ? (
                  <Menu as="div" className="ml-3 relative">
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
                        {user.name[0]}
                      </div>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <button
                            onClick={logout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Sign out
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="space-x-4">
                    <Link
                      to="/login"
                      className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-primary-600 text-white hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
