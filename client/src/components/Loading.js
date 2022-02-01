import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

function Loading({ size = 100 }) {
  return (
    <Modal centered show={true} backdrop='static' keyboard={false} 
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Spinner
          style={{
            width: size,
            height: size,
          }}
          animation='border'
        />
      </div>
    </Modal>
  );
}

export default Loading;
