import React from 'react';
import OriginalLayout from '@theme-original/Layout';

export default function Layout(props) {
  return (
    <div id="tailwind-docusaurus">
      <OriginalLayout {...props} />
    </div>
  );
}