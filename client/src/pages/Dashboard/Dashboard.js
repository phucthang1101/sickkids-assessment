import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import FeatureCard from '../../components/FeatureCard';
import './Dashboard.css';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Header from '../../components/Header';

const Dashboard = () => {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  let navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  return (
    <Layout>
      <Header/>
      <div className='dashboard_wrapper'>
        <Container fluid>
          <Col xs={12} lg={10} className='dashboard_container mx-auto'>
            <h1 className='dashboard_welcome'>
              Hello {userInfo ? userInfo.name : ''}
            </h1>
            <div className='dashboard_desc'>
              <p>
                The Nurturing the Seed App is an online developmental support
                planning tool that helps frontline practitioners create a
                developmental support plan for a young child based on the
                child's strengths and developmental needs.
              </p>
              <a href='/about'>Learn more about how the app works</a>
            </div>
          </Col>
        </Container>
        <Row className='mx-0 mt-5'>
          <FeatureCard
            title={'Easy to navigate'}
            desc={
              'Quickly navigating and locating developmental strategies by developmental area'
            }
          />
          <FeatureCard
            title={'Time Efficient'}
            desc={
              'Easily creating a printable developmental support plan without any formatting effort'
            }
          />
          <FeatureCard
            title={'Family-Friendly'}
            desc={
              "Collaboratively ensuring caregives' expertise and knowledge of the child are reflected in the plan"
            }
          />
          <FeatureCard
            title={'Portable'}
            desc={
              'Being able to create a plan anywhere by using a mobile device and easily sharing with families'
            }
          />
        </Row>
      </div>
    </Layout>
  );
};

export default Dashboard;
