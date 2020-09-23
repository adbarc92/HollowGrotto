import React from 'react';
import { Stage, Layer, Rect } from 'react-konva';
// import Konva from 'konva';

import { makeStyles } from '@material-ui/core';

import KonvaSprite from './KonvaSprite';

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

// const TinyRect = (): JSX.Element => {
//   return (
//     <Rect
//       x={100}
//       y={100}
//       width={16}
//       height={16}
//       fillLinearGradientStartPoint={{ x: 0, y: 0 }}
//       fill={'red'}
//     />
//   );
// };

const BackgroundRect = (props): JSX.Element => {
  return (
    <Rect
      x={0}
      y={0}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      fillLinearGradientStartPoint={{ x: CANVAS_WIDTH / 2, y: 0 }}
      fillLinearGradientEndPoint={{ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT }}
      fillLinearGradientColorStops={[0, '#aaf', 1, '#557']}
    />
  );
};

const animations = {
  // idle: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  idle: Array(16).fill(0),
};

const ReactCanvas = (): JSX.Element => {
  const classes = useStyles();
  // const [imagesLoaded, setImagesLoaded] = React.useState(false);

  return (
    <div className={classes.canvasContainer}>
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <Layer>
          <BackgroundRect />
        </Layer>
        <Layer>
          <KonvaSprite
            x={100}
            y={100}
            imageSrc={'Runner1.png'}
            animation={'idle'}
            animations={animations}
            frameRate={0}
            frameIndex={0}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default ReactCanvas;
