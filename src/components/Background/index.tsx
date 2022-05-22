import { Stage } from '@/components/Stage';
import { StageSettingsProps } from '@/components/Stage/Settings';
import { memo } from '@/utils/react/memo';
import dynamic from 'next/dynamic';

const StageSettings = dynamic<StageSettingsProps>(
  () => import('@/components/Stage/Settings').then((mod) => mod.StageSettings),
  { ssr: false },
);

export const Background = memo(function Background() {
  return (
    <div className="fixed inset-0 z-0 w-screen h-screen">
      <Stage />

      <StageSettings />
    </div>
  );
});
