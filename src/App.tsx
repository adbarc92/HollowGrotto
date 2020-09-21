import React, { useRef, useEffect, useState } from 'react';
import DrawableCanvas from './components/DrawableCanvas';
import Header from './components/Header';

const App = (): JSX.Element => {
  // let imageLoaded = Canvas();
  return (
    <div>
      <Header />
      <DrawableCanvas />
    </div>
  );
};

export default App;
