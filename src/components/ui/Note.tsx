import { Grip, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { DEFAULT_COLORS } from '@/constants';
import type { NoteTypes } from '@/types';

interface NoteProps {
  onDeleteNote: (id: string) => void;
  note: NoteTypes;
}

const Note = ({ onDeleteNote, note }: NoteProps) => {
  return (
    <motion.div
      className={`flex min-h-[13rem] min-w-[16rem] cursor-move flex-col justify-between rounded-2xl border-2 border-orange-300 bg-[#fef3c7] p-4`}
      style={{
        position: 'absolute',
        left: note.position.x,
        top: note.position.y
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Grip size={15} className="text-gray-500" />
          <div className="flex gap-0.5">
            {DEFAULT_COLORS.map((color) => (
              <div
                key={color.id}
                className={`h-[1rem] w-[1rem] cursor-pointer rounded-full border-2 border-white ${color.background}`}
              />
            ))}
          </div>
        </div>
        <Button
          onClick={() => onDeleteNote(note.id)}
          variant="ghost"
          className="hover:bg-transparent"
        >
          <Trash2 className="text-gray-500 hover:text-red-400" size={15} />
        </Button>
      </div>
      <div className="mb-2 h-full w-full rounded-lg shadow-sm">
        <textarea
          name={note.id}
          id={note.id}
          value={note.text}
          className="line-clamp-2 h-full w-full resize-none p-2 text-sm font-bold text-gray-700 outline-none"
          rows={5}
        />
      </div>
      <div>
        <p className="text-[12px] font-bold text-gray-500">{note.createdDate}</p>
      </div>
    </motion.div>
  );
};

export default Note;
