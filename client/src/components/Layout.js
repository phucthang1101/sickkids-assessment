import React from 'react';
import { Container } from 'react-bootstrap';
import './Layout.css';

function Layout({ children, title }) {
  return (
    <>
      <div className='mainback'>
        <Container fluid className='px-0'>
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
