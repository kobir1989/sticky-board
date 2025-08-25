import { AnimatePresence } from 'motion/react';
import Navbar from '@/components/ui/Navbar';
import Note from '@/components/ui/Note';
import SettingsPanel from '@/components/ui/SettingsPanel';
import ZoomControl from '@/components/ui/ZoomControl';
import { useAppSelector } from '@/redux/hooks';

const App = () => {
  const { isShowSettingsPanel, notes } = useAppSelector((store) => store.noteSlice);

  return (
    <main className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <Navbar />
      <AnimatePresence>{isShowSettingsPanel && <SettingsPanel />}</AnimatePresence>
      <div className="fixed right-4 bottom-16 z-50">
        <ZoomControl />
      </div>

      <div className="h-full w-full">
        {notes.map((note) => (
          <Note key={note.id} x={note.position.x} y={note.position.y} />
        ))}
      </div>
    </main>
  );
};

export default App;
