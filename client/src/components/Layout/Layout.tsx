import  { ReactNode } from 'react';


import  Navbar  from './Navbar';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div >
      <Navbar />
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;
