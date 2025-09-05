import { Grip, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import React, { forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import Textarea from '@/components/ui/textarea';
import { DEFAULT_COLORS } from '@/constants';
import type { ChangeEvent, ColorType, NoteTypes } from '@/types';

interface NoteProps {
  onDeleteNote: (id: string) => void;
  note: NoteTypes;
  isDraggedNoteId: boolean;
  onMouseDown: (e: React.MouseEvent, note: NoteTypes) => void;
  onNoteTextChange: (e: ChangeEvent, note: NoteTypes) => void;
  onColorUpdate: (color: ColorType, note: NoteTypes) => void;
}

const Note = forwardRef<HTMLDivElement, NoteProps>(
  (
    {
      isDraggedNoteId,
      note,
      onDeleteNote,
      onMouseDown,
      onNoteTextChange,
      onColorUpdate
    }: NoteProps,
    ref
  ) => {
    return (
      <motion.div
        onMouseDown={(e) => onMouseDown(e, note)}
        ref={ref}
        className={`${isDraggedNoteId ? 'z-10' : ''} note-container flex min-h-[13rem] min-w-[16rem] cursor-move flex-col justify-between rounded-2xl border-2 shadow-2xl hover:z-10 border-${note.color.border} bg-${note.color.background} p-4`}
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{
          opacity: 1,
          scale: isDraggedNoteId ? 0.95 : 1,
          rotate: isDraggedNoteId ? 2 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15,
          bounce: 0.6
        }}
        style={{
          position: 'absolute',
          left: note.position.x,
          top: note.position.y
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grip size={15} className="text-gray-500" />
            <div className="flex gap-1">
              {DEFAULT_COLORS.map((color) => (
                <div
                  key={color.id}
                  onClick={() => onColorUpdate(color, note)}
                  className={`relative h-4 w-4 scale-100 cursor-pointer rounded-full border-2 border-white transition-all hover:scale-130 bg-${color.background} ${color.id === note.color.id ? 'ring-1 ring-blue-400 ring-offset-1' : ''} `}
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
          <Textarea
            name={note.id}
            id={note.id}
            placeholder="Write your thoughts"
            value={note.text}
            onChange={(e) => onNoteTextChange(e, note)}
            rows={5}
            style={{ userSelect: 'none' }}
          />
        </div>
        <div>
          <p className="text-[12px] font-bold text-gray-500" style={{ userSelect: 'none' }}>
            {note.createdDate}
          </p>
        </div>
      </motion.div>
    );
  }
);

export default React.memo(Note);
