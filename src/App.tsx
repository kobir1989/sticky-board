import { AnimatePresence } from 'motion/react';
import { useRef } from 'react';
import Navbar from '@/components/ui/Navbar';
import Note from '@/components/ui/Note';
import SettingsPanel from '@/components/ui/SettingsPanel';
import ZoomControl from '@/components/ui/ZoomControl';
import { handleZoom, removeNote } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const App = () => {
  const { isShowSettingsPanel, notes, scale } = useAppSelector((store) => store.noteSlice);
  const dispatch = useAppDispatch();
  const stickyBoardRef = useRef(null);

  const handleMouseWheel = (e: React.WheelEvent) => {
    let zoom = scale;
    if (e.deltaY < 0) {
      zoom += 0.1;
    } else if (e.deltaY > 0) {
      zoom -= 0.1;
    }
    dispatch(handleZoom(zoom));
  };

  const handleDeleteNote = (id: string): void => {
    dispatch(removeNote(id));
  };

  return (
    <main className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <Navbar />
      <AnimatePresence>{isShowSettingsPanel && <SettingsPanel />}</AnimatePresence>
      <div className="fixed right-4 bottom-16 z-10">
        <ZoomControl />
      </div>

      <div className="h-full w-full" onWheel={(e) => handleMouseWheel(e)}>
        <div
          className="h-full w-full"
          ref={stickyBoardRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: '0 0'
          }}
        >
          {notes.map((note) => (
            <Note key={note.id} onDeleteNote={handleDeleteNote} note={note} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;
