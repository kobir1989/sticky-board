import { useEffect, useRef, useState } from 'react';
import Note from '@/components/ui/note';
import { handleZoom, removeNote, updateNotes } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { ChangeEvent, ColorType, NoteTypes } from '@/types';

const StickyBoard = () => {
  const { notes, scale } = useAppSelector((store) => store.noteSlice);
  const dispatch = useAppDispatch();
  const stickyBoardRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draggedNoteId, setDraggedNoteId] = useState<null | string>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseWheel = (e: React.WheelEvent) => {
    let zoom = scale;
    if (e.deltaY < 0) {
      zoom += 0.1;
    } else if (e.deltaY > 0) {
      zoom -= 0.1;
    }
    dispatch(handleZoom(zoom));
  };

  const handleDeleteNote = (id: string) => {
    dispatch(removeNote(id));
  };

  const handleMouseDown = (e: React.MouseEvent, note: NoteTypes) => {
    const { clientX, clientY } = e;
    const rect = (e.target as HTMLElement).closest('.note-container')?.getBoundingClientRect();

    if (rect) {
      // Calculate offset from note's top-left corner to mouse position
      const offsetX = (clientX - rect.left) / scale;
      const offsetY = (clientY - rect.top) / scale;

      setDraggedNoteId(note.id);
      setDragOffset({ x: offsetX, y: offsetY });
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    setDraggedNoteId(null);
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggedNoteId || !isDragging) return;

    e.preventDefault();
    const { clientX, clientY } = e;
    const boardRect = stickyBoardRef.current?.getBoundingClientRect();

    if (boardRect) {
      // Calculate new position relative to the board, accounting for scale and drag offset
      const x = (clientX - boardRect.left) / scale - dragOffset.x;
      const y = (clientY - boardRect.top) / scale - dragOffset.y;

      const draggedNote = notes.find((note) => note.id === draggedNoteId);
      if (draggedNote) {
        dispatch(
          updateNotes({
            ...draggedNote,
            position: { x, y }
          })
        );
      }
    }
  };

  // Add global mouse event listeners for smooth dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, draggedNoteId, dragOffset, scale, notes]);

  const handleNoteTextChange = (e: ChangeEvent, note: NoteTypes) => {
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
    <div className="h-full w-full" onWheel={(e) => handleMouseWheel(e)}>
      <div
        className="h-full w-full"
        ref={stickyBoardRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: '0 0'
        }}
      >
        {notes.map((note) => (
          <Note
            key={note.id}
            onDeleteNote={handleDeleteNote}
            note={note}
            onMouseDown={handleMouseDown}
            onNoteTextChange={handleNoteTextChange}
            onColorUpdate={handleColorUpdate}
            isDraggedNoteId={draggedNoteId === note.id}
          />
        ))}
      </div>
    </div>
  );
};

export default StickyBoard;
