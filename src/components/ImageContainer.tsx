import React, { useEffect } from 'react';
import { render } from 'react-dom';

export interface ImageContainerProps {
  src: string;
  width: number;
  height: number;
}

const ImageContainer = (props: ImageContainerProps): JSX.Element => {
  const { src, width, height } = props;

  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const img = new Image(width, height);
    img.onload = () => {
      setLoaded(true);
    };
    img.onerror = () => {
      setError(true);
      // console.error();
    };
    img.src = src;
  }, [src, width, height]);

  if (error) {
    return <div>There was an error loading an image</div>;
  }

  return !loaded ? (
    <div>Image Loading...</div>
  ) : (
    <img src={src} alt={'Jebaited'} />
  );
};

export default ImageContainer;
