import { AnimatePresence } from 'motion/react';
import Navbar from '@/components/ui/Navbar';
import SettingsPanel from '@/components/ui/SettingsPanel';
import { useAppSelector } from '@/redux/hooks';

const App = () => {
  const { isShowSettingsPanel } = useAppSelector((store) => store.noteSlice);
  return (
    <main className="h-screen w-screen p-4">
      <Navbar />
      <AnimatePresence>{isShowSettingsPanel && <SettingsPanel />}</AnimatePresence>
    </main>
  );
};

export default App;
