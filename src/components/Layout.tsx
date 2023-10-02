import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children }: any) => {
  return (
    <div className="mt-10">
      <NavBar></NavBar>
      <div className="lg:px-[10%] ">{children}</div>

      <Footer></Footer>
    </div>
  );
};

export default Layout;
