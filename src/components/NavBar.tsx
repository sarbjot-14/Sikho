import React from 'react';

export const NavBar = () => {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap shadow-sm lg:px-[10%] z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4  sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <a className="flex-none text-xl font-semibold dark:text-white" href="#">
          <img
            src={require('../assets/logo.png')}
            className="w-18 lg:w-30 max-h-20 "
          ></img>
        </a>
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
          {/* <a className="font-medium text-blue-500" href="#" aria-current="page">
            Landing
          </a>
          <a
            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
            href="#"
          >
            Account
          </a>
          <a
            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
            href="#"
          >
            Work
          </a>
          <a
            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
            href="#"
          >
            Blog
          </a> */}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
