import React from 'react';
import { Stage, Layer } from 'react-konva';
// import Konva from 'konva';

import { makeStyles } from '@material-ui/core';

import { KonvaSprite, TinyRect } from 'deprecated/KonvaSprite';

import { getScreenSize, CANVAS_WIDTH, CANVAS_HEIGHT } from 'App';

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
        <Layer>{/* <BackgroundRect /> */}</Layer>
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
        <Layer>
          <TinyRect pos={{ x: 100, y: 100 }} w={10} h={10} />
        </Layer>
      </Stage>
    </div>
  );
};

export default ReactCanvas;
