import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { handleZoom } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const ZoomControl = () => {
  const { scale } = useAppSelector((store) => store.noteSlice);
  const dispatch = useAppDispatch();

  const handleZoomChange = (value: number[]): void => {
    dispatch(handleZoom(value[0]));
  };

  const handleResetZoom = (): void => {
    dispatch(handleZoom(1));
  };

  return (
    <div className="flex h-[3rem] w-[15rem] items-center justify-center gap-3 rounded-2xl bg-white/10 p-4 shadow-2xl backdrop-blur-sm">
      <div className="flex w-full gap-2">
        <Slider
          max={3}
          step={0.1}
          onValueChange={(value) => handleZoomChange(value)}
          value={[scale]}
        />
        <p className="text-[12px] text-gray-500">{Math.floor(scale * 100)}%</p>
      </div>
      <div className="h-full w-[3px] border-l border-gray-300"></div>
      <Button variant="ghost" onClick={handleResetZoom}>
        <RotateCcw className="text-gray-500" size={18} />
      </Button>
    </div>
  );
};

export default ZoomControl;
