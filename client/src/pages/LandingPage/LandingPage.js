import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import './LandingPage.css';

function LandingPage() {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  return (
    <Layout>
      <Header />
      <div className='main'>
        <Container fluid>
          <Row className='mx-0'>
            <div className='intro-text'>
              <Col xs={12} lg={5} className='ml-auto'>
                <div>
                  <h1 className='title animate-reveal animate-first'>Welcome to Nuturing the Seed</h1>
                  <p className='subtitle animate-reveal animate-second'>A perfect online developmental planning tool for you.</p>
                  <div className='buttonContainer animate-reveal animate-third'>
                  <Link to='/login'>
                    <Button size='lg' className='landingbutton btn1'>
                      Login
                    </Button>
                  </Link>
                  <Link to='/register'>
                    <Button
                      variant='outline-primary'
                      size='lg'
                      className='landingbutton btn2'
                    >
                      Signup
                    </Button>
                  </Link>
                </div>
                </div>
               
              </Col>
            </div>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

export default LandingPage;
