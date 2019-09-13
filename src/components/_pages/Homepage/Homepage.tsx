import React from 'react';
import Layout from '$components/Layout';

const Homepage: React.FC<any> = ({ data: { site, allMdx } }) => {
  return (
    <Layout>
      <h1>Welcome Home</h1>
    </Layout>
  );
};

export default Homepage;
