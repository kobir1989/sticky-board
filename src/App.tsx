import StickyBoard from '@/components/sticky-board';
import StickyNotesLayout from '@/layouts/sticky-notes-layout';

const App = () => {
  return (
    <StickyNotesLayout>
      <StickyBoard />
    </StickyNotesLayout>
  );
};

export default App;
