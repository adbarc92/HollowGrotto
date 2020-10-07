import React from 'react';

import { makeStyles } from '@material-ui/core';
import theme from 'theme';
import {
  BORDER_RADIUS,
  BACKGROUND_COLOR,
  BORDER_STYLE,
  BORDER_COLOR,
  BORDER_SPACING,
  COLOR,
  TEXT_STROKE,
  TEXT_ALIGN,
  FONT_SIZE,
} from 'theme';
import { Battle } from 'model/Model.Battle';
import { getScreenSize } from './ReactCanvas';

interface BattleTextProps {
  text: string | null;
}

const useStyles = makeStyles(theme => {
  return {
    outerContainer: {
      // backgroundColor: theme.menu.backgroundColor, // NOTE: QUESTION
      borderRadius: BORDER_RADIUS,
      backgroundColor: BACKGROUND_COLOR,
      borderStyle: BORDER_STYLE,
      borderColor: BORDER_COLOR,
      WebkitTextStroke: TEXT_STROKE,
      color: COLOR,
      textAlign: TEXT_ALIGN,
      fontSize: '18px',
      borderSpacing: BORDER_SPACING,
      position: 'absolute',
      width: `${getScreenSize()}px`,
      height: `${getScreenSize() / 7}px`,
      // left: `${window.innerWidth / 2 - getScreenSize() / 2}px`,
      left: '25%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    innerContainer: {
      top: '50%',
    },
  };
});

const BattleTextCmpt = (props: BattleTextProps): JSX.Element => {
  const classes = useStyles(theme);
  const { text } = props;
  return text ? (
    <div style={{ zIndex: 10 }} className={classes.outerContainer}>
      <div className={classes.innerContainer}>{text}</div>
    </div>
  ) : (
    <div></div>
  );
};

export default BattleTextCmpt;
