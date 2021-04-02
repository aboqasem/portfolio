import { ICommonDataState } from './commonData';
import { IRainDropsState } from './rainDrops';
import { RootState } from './types';

export const selectRainDropsState = (state: RootState): IRainDropsState => state.rainDrops;

export const selectCommonDataState = (state: RootState): ICommonDataState => state.commonData;
