import React from 'react';
import './FeatureCard.css';
import { Col } from 'react-bootstrap';

const FeatureCard = (props) => {
  return (
    <Col xs={12} md={6} lg={3} className='mb-3'>
      <div className='feature_box'>
        <h4>{props.title}</h4>
        <p>{props.desc}</p>
      </div>
    </Col>
  );
};

export default FeatureCard;
