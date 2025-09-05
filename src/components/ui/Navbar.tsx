import { Plus, Settings, Share2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { toggleSettingsPanel, addNewNote } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { generateRandomPosition, getFormattedDateAndTime } from '@/utils';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { notes, defaultNoteColor } = useAppSelector((store) => store.noteSlice);

  const handleToggleSettingsPanel = () => {
    dispatch(toggleSettingsPanel());
  };

  const handleAddNewNote = () => {
    dispatch(
      addNewNote({
        id: uuidv4(),
        text: '',
        color: {
          ...defaultNoteColor
        },
        position: {
          x: generateRandomPosition().x,
          y: generateRandomPosition().y
        },
        createdDate: getFormattedDateAndTime()
      })
    );
  };

  return (
    <nav className="fixed z-10 w-[98%] rounded-full bg-white/30 px-2 py-2 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-[#CAD5E2]">
          <p className="font-bold text-gray-600">{notes?.length}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Share2 />
            Share
          </Button>
          <Button size="sm" variant="outline" onClick={handleToggleSettingsPanel}>
            <Settings />
            Settings
          </Button>
          <Button size="sm" onClick={handleAddNewNote}>
            <Plus />
            Add Note
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
