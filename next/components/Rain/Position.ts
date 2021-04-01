import { IPoint, IPosition } from './types';

export default class Position implements IPosition {
  public tl: IPoint;

  // public tr: IPoint;

  // public bl: IPoint;

  public br: IPoint;

  constructor(tl: IPoint, /* tr: IPoint, bl: IPoint , */ br: IPoint) {
    this.tl = tl;
    // this.tr = tr;
    // this.bl = bl;
    this.br = br;
  }

  update = (pos: IPosition): void => {
    this.tl = pos.tl;
    // this.tr = pos.tr;
    // this.bl = pos.bl;
    this.br = pos.br;
  };

  overlaps = (pos: Position): boolean => {
    // if one rectangle is beside other
    if (this.tl.x >= pos.br.x || pos.tl.x >= this.br.x) return false;
    // if one rectangle is above other
    if (this.tl.y >= pos.br.y || pos.tl.y >= this.br.y) return false;

    return true;
  };
}
