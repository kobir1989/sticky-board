import { RotateCcw, Settings, X } from 'lucide-react';
import * as motion from 'motion/react-client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DEFAULT_COLORS } from '@/constants';
import {
  resetSettings,
  setDefaultColor,
  toggleInfiniteGrid,
  toggleMiniMap,
  toggleSettingsPanel
} from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { DefaultColorNote } from '@/types';

const SettingsPanel = () => {
  const dispatch = useAppDispatch();
  const { defaultNoteColor, isShowGrid, isShowMiniMap } = useAppSelector(
    (state) => state.noteSlice
  );

  const handleCloseSettingsPanel = () => {
    dispatch(toggleSettingsPanel());
  };

  const handleSelectDefaultColor = (color: DefaultColorNote) => {
    dispatch(setDefaultColor(color));
  };

  const handleToggleMiniMap = (checked: boolean) => {
    dispatch(toggleMiniMap(checked));
  };

  const handleToggleGrid = (checked: boolean) => {
    dispatch(toggleInfiniteGrid(checked));
  };

  const handleResetDefault = () => {
    dispatch(resetSettings());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed top-0 left-0 z-20 h-screen w-screen bg-black/10 backdrop-blur-sm"
    >
      <motion.div
        initial={{ x: 300, rotate: 3, opacity: 0 }}
        animate={{ x: 0, rotate: 0, opacity: 1 }}
        exit={{ x: 300, rotate: 3, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-4 right-4 h-[95%] w-[400px] rounded-2xl bg-white/35 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between rounded-t-xl bg-white/70 px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500 p-1 text-white">
              <Settings size={15} />
            </div>
            <div>
              <h3>Settings</h3>
              <p className="text-sm text-gray-500">Customize your workspace</p>
            </div>
          </div>
          <Button variant="ghost" className="text-gray-500" onClick={handleCloseSettingsPanel}>
            <X />
          </Button>
        </div>
        <div className="px-6">
          <div className="flex flex-col gap-4 py-6">
            <div className="flex flex-col gap-4">
              <div>
                <h4>Display</h4>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm">Show Mini Map</h5>
                  <p className="line-clamp-1 text-[12px] text-gray-500">
                    Display navigation mini map in the corner
                  </p>
                </div>
                <div>
                  <Switch
                    className="cursor-pointer"
                    checked={isShowMiniMap}
                    onCheckedChange={(checked) => handleToggleMiniMap(checked)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm">Show Grid</h5>
                  <p className="line-clamp-1 text-[12px] text-gray-500">
                    Display background grid lines
                  </p>
                </div>
                <div>
                  <Switch
                    className="cursor-pointer"
                    checked={isShowGrid}
                    onCheckedChange={(checked) => handleToggleGrid(checked)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h4>Notes</h4>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm">Default note color</h5>
                  <p className="line-clamp-1 text-[12px] text-gray-500">
                    Choose Default Color for new notes
                  </p>
                  <div className="mt-4 grid w-full grid-cols-3 grid-rows-2 gap-x-12 gap-y-4">
                    {DEFAULT_COLORS.map((color) => (
                      <div
                        key={color.id}
                        onClick={() => handleSelectDefaultColor(color)}
                        className={`h-[2rem] w-[2rem] scale-100 cursor-pointer rounded-md transition-all hover:scale-120 bg-${color.background} ${defaultNoteColor?.id === color.id ? 'border-3 border-gray-600' : `border-2 border-${color.border}`}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-t-white/20 py-4">
            <Button variant="outline" className="w-full" onClick={handleResetDefault}>
              {' '}
              <RotateCcw />
              Reset to default
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default SettingsPanel;
