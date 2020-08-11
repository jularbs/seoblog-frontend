import  { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavLink,
  NavItem
} from 'reactstrap';

import {APP_NAME} from '../config';
import Link from 'next/link';
import {signout, isAuth} from '../actions/auth';
import Router from 'next/router';

import NProgress from 'nprogress';
import '../node_modules/nprogress/nprogress.css';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
            <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>

            <React.Fragment>
              <NavItem>
                <Link href="/blogs">
                    <NavLink style={{cursor: 'pointer'}}>Blogs</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>

            {!isAuth() && 
            <React.Fragment>
              <NavItem>
                <Link href="/signin">
                    <NavLink style={{cursor: 'pointer'}}>Sign in</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                  <Link href="/signup">
                      <NavLink style={{cursor: 'pointer'}}>Sign up</NavLink>
                  </Link>  
              </NavItem>
            </React.Fragment>}
          
            {isAuth() && isAuth().role == 0 && (
              <NavItem>
                  <Link href="/user">
                    <NavLink>
                      {`${isAuth().name}'s Dashboard`}
                    </NavLink> 
                  </Link>
              </NavItem>
            )}
            {isAuth() && isAuth().role == 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink>
                    {`${isAuth().name}'s Dashboard`}
                  </NavLink> 
                </Link>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink style={{cursor: 'pointer'}} onClick={() => signout(()=>Router.replace('/signup'))}>Sign out</NavLink> 
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;