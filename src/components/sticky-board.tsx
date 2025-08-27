import { useEffect, useRef, useState } from 'react';
import Note from '@/components/ui/Note';
import { handleZoom, removeNote, updateNotes } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { ChangeEvent, ColorType, NoteTypes } from '@/types';

const StickyBoard = () => {
  const { notes, scale } = useAppSelector((store) => store.noteSlice);
  const dispatch = useAppDispatch();
  const stickyBoardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [boardOffset, setBoardOffset] = useState({ x: 0, y: 0 });

  // Zoom in and out
  const handleMouseWheel = (e: React.WheelEvent) => {
    e.preventDefault(); // avoid page scroll

    const rect = stickyBoardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = scale * zoomFactor;

    // adjust offset so zoom is centered at mouse position
    const newOffsetX = mouseX - (mouseX - boardOffset.x) * (newScale / scale);
    const newOffsetY = mouseY - (mouseY - boardOffset.y) * (newScale / scale);

    setBoardOffset({ x: newOffsetX, y: newOffsetY });
    dispatch(handleZoom(newScale));
  };

  // Mouse down starts the board drag
  const handleGlobalMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - boardOffset.x,
      y: e.clientY - boardOffset.y
    });
  };

  // Global move
  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setBoardOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleDeleteNote = (id: string) => {
    dispatch(removeNote(id));
  };

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
    <div
      className="h-full w-full cursor-grab"
      onWheel={(e) => handleMouseWheel(e)}
      onMouseDown={(e) => handleGlobalMouseDown(e)}
    >
      <div
        className="h-full w-full"
        ref={stickyBoardRef}
        style={{
          transform: `translate(${boardOffset.x}px, ${boardOffset.y}px) scale(${scale})`,
          transformOrigin: '0 0'
        }}
      >
        {notes.map((note) => (
          <Note
            key={note.id}
            onDeleteNote={handleDeleteNote}
            note={note}
            // onMouseDown={handleMouseDown}
            onNoteTextChange={handleNoteTextChange}
            onColorUpdate={handleColorUpdate}
            isDraggedNoteId={false}
          />
        ))}
      </div>
    </div>
  );
};

export default StickyBoard;
