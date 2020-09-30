const MENU_DEFAULT_LINE_HEIGHT = 16;

type MenuIncrement = -1 | 1;

export interface Menu {
  x: number;
  y: number;
  w: number;
  h: number;
  items: string[];
  i: number;
  cb: (i: number) => void;
  disabledItems: number[];
  bg: boolean;
  lineHeight: number;
}

export const createVerticalMenu = (
  x: number,
  y: number,
  w: number,
  items: string[],
  cb: (i: number) => void,
  disabledItems: number[],
  bg?: boolean,
  lineHeight?: number
): Menu => {
  lineHeight = lineHeight || MENU_DEFAULT_LINE_HEIGHT;
  return {
    x,
    y,
    w,
    h: lineHeight * items.length,
    i: 0,
    cb,
    disabledItems,
    items,
    lineHeight,
    bg: !!bg,
  };
};

export const menuSelectCurrentItem = (menu: Menu) => {
  menu.cb(menu.i);
  // G_view_playSound('menuConfirm');
};

export const menuSelectNothing = (menu: Menu) => {
  menu.cb(-1);
  // G_view_playSound('menuCancel');
};
