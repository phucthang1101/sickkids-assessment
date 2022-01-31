import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './Layout.css';
import Header from './Header';

function Layout({ children, title }) {
  return (
    <>
      <div className='mainback'>
        <Container fluid>
          {title && (
            <>
              <h1 className='heading'>{title}</h1>
              <hr />
            </>
          )}
          {children}
        </Container>
      </div>
    </>
  );
}

export default Layout;
