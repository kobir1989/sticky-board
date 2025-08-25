import { AnimatePresence } from 'motion/react';
import Navbar from '@/components/ui/Navbar';
import SettingsPanel from '@/components/ui/SettingsPanel';
import ZoomControl from '@/components/ui/ZoomControl';
import { useAppSelector } from '@/redux/hooks';

const App = () => {
  const { isShowSettingsPanel } = useAppSelector((store) => store.noteSlice);
  return (
    <main className="h-screen w-screen p-4">
      <Navbar />
      <AnimatePresence>{isShowSettingsPanel && <SettingsPanel />}</AnimatePresence>
      <div className="fixed right-4 bottom-16">
        <ZoomControl />
      </div>
    </main>
  );
};

export default App;
