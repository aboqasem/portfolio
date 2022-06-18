import { IS_DEV } from '@/constants/shared';
import React from 'react';

export function memo<T extends React.ComponentType<any>>(
  Component: T,
  propsAreEqual?: (
    prevProps: Readonly<React.ComponentProps<T>>,
    nextProps: Readonly<React.ComponentProps<T>>,
  ) => boolean,
): T {
  const MemoComponent = React.memo(Component, propsAreEqual);

  if (IS_DEV) {
    MemoComponent.displayName = Component.displayName || Component.name || 'MemoizedComponent';
  }

  return MemoComponent as unknown as T;
}
