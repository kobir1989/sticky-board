import { Grip, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { DEFAULT_COLORS } from '@/constants';
import { updateNotes } from '@/redux/features/noteSlice';
import { useAppDispatch } from '@/redux/hooks';
import type { ColorType, NoteTypes } from '@/types';

interface NoteProps {
  onDeleteNote: (id: string) => void;
  note: NoteTypes;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, note: NoteTypes) => void;
  draggedNoteId: string | null;
}

const Note = ({ onDeleteNote, note, onMouseDown, draggedNoteId }: NoteProps) => {
  const dispatch = useAppDispatch();

  const handleNoteTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>, note: NoteTypes) => {
    console.log('handleNoteTextChange', e);
    e.stopPropagation();
    dispatch(
      updateNotes({
        ...note,
        text: e.target.value
      })
    );
  };

  const handleColorUpdate = (selectedColor: ColorType, selectedNote: NoteTypes) => {
    dispatch(
      updateNotes({
        ...selectedNote,
        color: selectedColor
      })
    );
  };

  return (
    <motion.div
      className={`${draggedNoteId === note.id ? 'z-10' : ''} note-container flex min-h-[13rem] min-w-[16rem] cursor-move flex-col justify-between rounded-2xl border-2 shadow-2xl ${note.color.border} ${note.color.background} p-4`}
      animate={{
        rotate: draggedNoteId === note.id ? 2 : 0,
        transform: draggedNoteId === note.id ? 'scale(0.9)' : 'scale(1)'
      }}
      transition={{ type: 'spring', stiffness: 700, damping: 50 }}
      style={{
        position: 'absolute',
        left: note.position.x,
        top: note.position.y
      }}
      onMouseDown={(e) => onMouseDown(e, note)}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Grip size={15} className="text-gray-500" />
          <div className="flex gap-0.5">
            {DEFAULT_COLORS.map((color) => (
              <div
                key={color.id}
                onClick={() => handleColorUpdate(color, note)}
                className={`h-[1rem] w-[1rem] cursor-pointer rounded-full border-2 ${color.id === note.color.id ? 'border-blue-400' : 'border-white'} ${color.background} `}
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
          onChange={(e) => handleNoteTextChange(e, note)}
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
