import { RotateCcw } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const ZoomControl = () => {
  return (
    <div className="flex h-[3rem] w-[15rem] items-center justify-center gap-3 rounded-2xl bg-white/10 p-4 shadow-2xl backdrop-blur-sm">
      <div className="flex w-full gap-2">
        <Slider defaultValue={[33]} max={100} step={1} />
        <p className="text-[12px] text-gray-500">70%</p>
      </div>
      <div className="h-full w-[3px] border-l border-gray-300"></div>
      <RotateCcw className="text-gray-500" size={18} />
    </div>
  );
};

export default ZoomControl;
