export interface IPoint {
  x: number;
  y: number;
}

/**
 * The whole point of implementing this is to check overlapping drops.
 * And we do not need {tr, bl} to do.
 */
export interface IPosition {
  tl: IPoint;
  // tr: IPoint;
  // bl: IPoint;
  br: IPoint;
}
