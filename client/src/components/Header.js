import React, { useEffect } from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import './Header.css';

function Header() {
  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {}, [userInfo]);

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='primary'
      variant='dark'
      className='header_navbar'
    >
      <Container>
        <Navbar.Brand href='/'>
          <div>
            <img src='/images/logo_img_rm_bg.png' className='header_nav_logo mr-3' alt='logo'/>
            Nurturing the Seed
          </div>
        </Navbar.Brand>

       
        <Navbar.Collapse className='show' id='responsive-navbar-nav'>
         
          <Nav className='ml-auto'>
            {userInfo ? (
              <>
                <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
                <NavDropdown
                  title={`${userInfo.name}`}
                  id='collasible-nav-dropdown'
                >
                  <NavDropdown.Item href='/profile'>
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href='/login'>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
