import React from 'react';
import { Rect } from 'react-konva';

interface BackgroundProps {
  height: number;
  width: number;
  gradientStartColor?: string;
  gradientEndColor?: string;
}

const BattleBg = (props: BackgroundProps): JSX.Element => {
  const { height, width, gradientStartColor, gradientEndColor } = props;
  return (
    <Rect
      x={0}
      y={0}
      width={width}
      height={height}
      fillLinearGradientStartPoint={{ x: width / 2, y: 0 }}
      fillLinearGradientEndPoint={{ x: width / 2, y: height }}
      fillLinearGradientColorStops={[
        0,
        gradientStartColor || '#aaf',
        1,
        gradientEndColor || '#557',
      ]}
    />
  );
};

export default BattleBg;
