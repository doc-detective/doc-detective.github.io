import React from 'react';
import ArazzoRunner from '@site/src/components/ArazzoRunner'; // Assuming component is in same directory
import Layout from '@theme/Layout';

interface ArazzoProps {
  // Add any props needed
  initialState?: any;
}

const Arazzo: React.FC<ArazzoProps> = ({ initialState }) => {
  return (
    <div className="arazzo-container">
      <ArazzoRunner />
    </div>
  );
};

export default Arazzo;
