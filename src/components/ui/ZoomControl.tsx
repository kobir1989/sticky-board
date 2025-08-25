import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { handleZoom } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const ZoomControl = () => {
  const { zoomLabel } = useAppSelector((store) => store.noteSlice);
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
          defaultValue={[zoomLabel]}
          max={10}
          step={1}
          onValueChange={(value) => handleZoomChange(value)}
          value={[zoomLabel]}
        />
        <p className="text-[12px] text-gray-500">{zoomLabel}%</p>
      </div>
      <div className="h-full w-[3px] border-l border-gray-300"></div>
      <Button variant="ghost" onClick={handleResetZoom}>
        <RotateCcw className="text-gray-500" size={18} />
      </Button>
    </div>
  );
};

export default ZoomControl;
