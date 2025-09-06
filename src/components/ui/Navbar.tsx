import { Plus, Settings } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { toggleSettingsPanel } from '@/redux/features/noteSlice';
import { useAppDispatch } from '@/redux/hooks';
import type { NoteTypes } from '@/types';

interface NavbarProps {
  onAddNewNote: () => void;
  notes: NoteTypes[];
}

const Navbar = ({ onAddNewNote, notes }: NavbarProps) => {
  const dispatch = useAppDispatch();

  const handleToggleSettingsPanel = () => {
    dispatch(toggleSettingsPanel());
  };

  return (
    <nav className="fixed z-10 w-[98%] rounded-full bg-white/30 px-2 py-2 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-[#CAD5E2]">
          <p className="font-bold text-gray-600">{notes?.length}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleToggleSettingsPanel}>
            <Settings />
            Settings
          </Button>
          <Button size="sm" onClick={onAddNewNote}>
            <Plus />
            Add Note
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
