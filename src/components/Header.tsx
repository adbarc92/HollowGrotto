import React from 'react';
import { loadImages } from '../utils/LoadImage';

const SPRITEPATH = '../../../scratch';

const Header = (): JSX.Element => {
  // console.log('test');
  const img1path = `${SPRITEPATH}/Runner1.png`;
  const img2path = `${SPRITEPATH}/Runner2.png`;
  const [imgElems, loaded] = loadImages([img1path, img2path]);
  return (
    <div>
      <h1>Hollow Grotto</h1>
      {loaded ? (
        imgElems.map((elem, i) => {
          return <div key={i}>{elem}</div>;
        })
      ) : (
        <div>Where the image should go</div>
      )}
    </div>
  );
};

export default Header;
