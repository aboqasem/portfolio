import { connect } from 'react-redux';
import { initializeRainDrops } from './rainDrops';
import { RootState } from './types';

const mapRainDropsState = (state: RootState) => {
  return { rainDrops: state.rainDrops };
};

const mapRainDropsDispatch = {
  initializeRainDrops,
};

export const rainDropsConnector = connect(mapRainDropsState, mapRainDropsDispatch);
