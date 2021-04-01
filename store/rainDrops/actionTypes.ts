import { RainDrops } from '@/components/Rain';

export const RAIN_DROPS_INIT = 'RAIN_DROPS_INIT';

interface IRainDropsInit {
  type: typeof RAIN_DROPS_INIT;
  payload: RainDrops;
}

export type RainDropsDispatchTypes = IRainDropsInit;
