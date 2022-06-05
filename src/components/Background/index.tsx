import { Stage } from '@/components/Stage';
import { StageSettings } from '@/components/Stage/Settings';
import { memo } from '@/utils/react/memo';

export const Background = memo(function Background() {
  return (
    <div className="fixed inset-0 z-0 w-screen h-screen">
      <Stage />

      <StageSettings />
    </div>
  );
});
