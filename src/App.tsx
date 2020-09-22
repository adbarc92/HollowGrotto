import React, { useRef, useEffect, useState } from 'react';
import DrawableCanvas from './components/DrawableCanvas';
import Header from './components/Header';
import ReactCanvas from './components/ReactCanvas';

const App = (): JSX.Element => {
  // let imageLoaded = Canvas();
  return (
    <div>
      <Header />
      {/* <DrawableCanvas /> */}

      <ReactCanvas />
    </div>
  );
};

export default App;
