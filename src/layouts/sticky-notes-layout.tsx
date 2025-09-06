import { AnimatePresence } from 'motion/react';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EmptyState from '@/components/ui/empty-state';
import MiniMap from '@/components/ui/mini-map';
import Navbar from '@/components/ui/Navbar';
import SettingsPanel from '@/components/ui/settings-panel';
import ZoomControl from '@/components/ui/zoom-control';
import { addNewNote } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { generateRandomPosition, getFormattedDateAndTime } from '@/utils';

interface StickyNotesLayoutProps {
  children: React.ReactNode;
}

const StickyNotesLayout = ({ children }: StickyNotesLayoutProps) => {
  const { isShowSettingsPanel, isShowMiniMap, notes, defaultNoteColor, scale } = useAppSelector(
    (store) => store.noteSlice
  );
  const dispatch = useAppDispatch();

  const handleAddNewNote = useCallback(() => {
    dispatch(
      addNewNote({
        id: uuidv4(),
        text: '',
        color: {
          ...defaultNoteColor
        },
        position: {
          x: generateRandomPosition(scale).x,
          y: generateRandomPosition(scale).y
        },
        createdDate: getFormattedDateAndTime()
      })
    );
  }, [defaultNoteColor.id]);

  return (
    <main className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <header>
        <Navbar onAddNewNote={handleAddNewNote} notes={notes} />
        <AnimatePresence>{isShowSettingsPanel && <SettingsPanel />}</AnimatePresence>
      </header>
      {children}
      <div className="fixed right-4 bottom-6 z-10">
        <ZoomControl />
      </div>
      {isShowMiniMap && (
        <div className="fixed bottom-6 left-4 z-10">
          <MiniMap />
        </div>
      )}
      {notes.length === 0 && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <EmptyState onAddNewNote={handleAddNewNote} />
        </div>
      )}
    </main>
  );
};

export default StickyNotesLayout;
