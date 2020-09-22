import React from 'react';
import {
  Stage,
  Layer,
  Rect,
  Text,
  Sprite,
  KonvaNodeComponent,
} from 'react-konva';
import Konva from 'konva';

import { makeStyles } from '@material-ui/core';

import { loadImage } from '../utils/LoadImage';

const useStyles = makeStyles(() => {
  return {
    canvasContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});

const CANVAS_HEIGHT = 512;
const CANVAS_WIDTH = 512;

// const rect = new Konva.Rect({
//   x: 0,
//   y: 0,
//   width: CANVAS_WIDTH,
//   height: CANVAS_HEIGHT,
//   fillLinearGradientStartPoint: { x: 0, y: 0 },
//   fillLinearGradientEndPoint: { x: CANVAS_WIDTH, y: CANVAS_HEIGHT },
//   fillLinearGradientColorStops: [0, '#557', 1, '#aaf'],
// });

const TinyRect = (): JSX.Element => {
  return (
    <Rect
      x={0}
      y={0}
      width={16}
      height={16}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fill={'red'}
    />
  );
};

const BackgroundRect = (props): JSX.Element => {
  return (
    <Rect
      x={0}
      y={0}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{ x: CANVAS_WIDTH, y: CANVAS_HEIGHT }}
      fillLinearGradientColorStops={[0, '#557', 1, '#aaf']}
    />
  );
};

const animations = {
  // idle: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  idle: Array(16).fill(0),
};

// Post Sprite to Layer

// const drawSpriteOnLayer = (layer: KonvaNodeComponent)

const KonvaSprite = (props): JSX.Element => {
  const { imgPath } = props;
  const img = new Image();
  img.src = imgPath;
  img.onload = () => {
    console.log('Image loaded!');
    return (
      <Sprite
        x={100}
        y={100}
        image={img}
        animation={'idle'}
        animations={animations}
      />
    );
  };
  return <TinyRect />;
};

const ReactCanvas = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.canvasContainer}>
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <Layer>
          <BackgroundRect />
        </Layer>
        <Layer>
          <KonvaSprite imgPath={'Runner1.png'} />
        </Layer>
      </Stage>
    </div>
  );
};

export default ReactCanvas;
