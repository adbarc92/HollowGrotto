import React, { useEffect } from 'react';
import { Rect, Sprite } from 'react-konva';

interface Animations {
  idle: number[];
}

interface KonvaSpriteProps {
  x: number;
  y: number;
  imageSrc: string;
  animation: string;
  animations: Animations;
  frameRate: number;
  frameIndex: number;
}

const TinyRect = (): JSX.Element => {
  return (
    <Rect
      x={100}
      y={100}
      width={16}
      height={16}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fill={'red'}
    />
  );
};

const KonvaSprite = (props: KonvaSpriteProps): JSX.Element => {
  const {
    x,
    y,
    imageSrc,
    animation,
    animations,
    frameRate,
    frameIndex,
  } = props;

  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [img, setImg] = React.useState(new Image());

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
      setImg(img);
    };
    img.onerror = () => {
      setError(true);
      // console.error();
    };
    img.src = imageSrc;
  }, [imageSrc]);

  if (error) console.error(`There was an error loading image: ${imageSrc}`);
  return !loaded ? (
    <TinyRect />
  ) : (
    <Sprite
      x={x}
      y={y}
      image={img}
      animation={animation}
      animations={animations}
      frameRate={frameRate}
      frameIndex={frameIndex}
    />
  );
};

export default KonvaSprite;
