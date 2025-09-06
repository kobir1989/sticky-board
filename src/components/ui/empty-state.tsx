import { Palette, Plus } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddNewNote: () => void;
}

const EmptyState = ({ onAddNewNote }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 sm:mb-6 sm:h-24 sm:w-24">
        <Palette className="text-blue-500" size={40} />
      </div>
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Your canvas awaits</h1>
        <p className="text-md text-gray-500">
          Create your first sticky note <br />
          to start organizing your <br />
          thoughts and ideas.
        </p>
        <Button onClick={onAddNewNote}>
          <Plus />
          Create First Note
        </Button>
      </div>
    </div>
  );
};

export default React.memo(EmptyState);
