import React from 'react';

export function memo<T extends React.ComponentType<any>>(
  Component: T,
  propsAreEqual?: (
    prevProps: Readonly<React.ComponentProps<T>>,
    nextProps: Readonly<React.ComponentProps<T>>,
  ) => boolean,
): T {
  const displayName = Component.displayName || Component.name || 'MemoizedComponent';

  const MemoComponent = React.memo(Component, propsAreEqual);
  MemoComponent.displayName = displayName;

  return MemoComponent as unknown as T;
}
