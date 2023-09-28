import React from 'react';
import { Link } from 'react-router-dom';

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
        <div className="flex flex-col items-center gap-5  justify-end mt-0 pl-5 lg:pl-0 md:flex-row lg:mt-5">
          <Link to="/">
            <h3 className="text-primary font-semibold text-xl">Home</h3>
          </Link>

          <Link to="/employment">
            <h3 className="text-primary font-semibold text-xl">Employment</h3>
          </Link>
          {/* <a
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
