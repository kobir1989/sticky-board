import { AnimatePresence } from 'motion/react';
import Navbar from '@/components/ui/navbar';
import SettingsPanel from '@/components/ui/settings-panel';
import ZoomControl from '@/components/ui/zoom-control';
import { useAppSelector } from '@/redux/hooks';

interface StickyNotesLayoutProps {
  children: React.ReactNode;
}

const StickyNotesLayout = ({ children }: StickyNotesLayoutProps) => {
  const { isShowSettingsPanel } = useAppSelector((store) => store.noteSlice);
  return (
    <main className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <header>
        <Navbar />
        <AnimatePresence>{isShowSettingsPanel && <SettingsPanel />}</AnimatePresence>
      </header>
      {children}
      <div className="fixed right-4 bottom-16 z-10">
        <ZoomControl />
      </div>
    </main>
  );
};

export default StickyNotesLayout;
