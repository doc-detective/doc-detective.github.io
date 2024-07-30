import React from 'react';
import Layout from '@theme/Layout';
import { components } from '../../doc-detective-common';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
      <components.SchemaField />
    </Layout>
  );
}
