import { Stage } from '@/components/Stage';
import { memo } from '@/utils/react/memo';

export const Background = memo(function Background() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#faf5ef] z-0">
      <Stage />
    </div>
  );
});
