import { useCallback, useEffect, useRef, useState } from 'react';
import InfiniteGrid from '@/components/ui/infinite-grid';
import Note from '@/components/ui/Note';
import {
  handleZoom,
  removeNote,
  updateBoardCord,
  updateNoteCord,
  updateNotes
} from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { BoardRef, ChangeEvent, ColorType, NoteRef, NoteTypes } from '@/types';

const StickyBoard = () => {
  const {
    notes,
    scale,
    isShowGrid,
    x: boardX,
    y: boardY
  } = useAppSelector((store) => store.noteSlice);
  const dispatch = useAppDispatch();
  const [activeDraggedNote, setActiveDraggedNote] = useState<null | string>(null);

  const { current: stickyBoardRef } = useRef<BoardRef>({
    isDragging: false,
    startBoardCord: { x: 0, y: 0 },
    startBoardMouseCord: { x: 0, y: 0 }
  });
  const { current: noteRef } = useRef<NoteRef>({
    draggedNote: null,
    startNoteCord: { x: 0, y: 0 },
    startNoteMouseCord: { x: 0, y: 0 }
  });
  // Zoom in and out
  const handleMouseWheel = (e: React.WheelEvent) => {
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = scale * zoomFactor;
    dispatch(handleZoom(newScale));
  };

  const handleMouseDownOnBoard = (e: React.MouseEvent) => {
    // Return if note is Dragging
    if (noteRef.draggedNote !== null) return;

    stickyBoardRef.isDragging = true;
    stickyBoardRef.startBoardMouseCord = { x: e.pageX, y: e.pageY };
    stickyBoardRef.startBoardCord = { x: boardX, y: boardY };
  };

  const handleMouseDownOnNote = useCallback((e: React.MouseEvent, note: NoteTypes) => {
    e.stopPropagation();
    noteRef.draggedNote = note;
    noteRef.startNoteMouseCord = { x: e.pageX, y: e.pageY };
    noteRef.startNoteCord = { x: note?.position.x, y: note?.position.y };
    setActiveDraggedNote(note.id);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    // Board move
    if (stickyBoardRef.isDragging) {
      // get total dragged distance X,y
      const boardDraggedDistanceX = (e.pageX - stickyBoardRef.startBoardMouseCord.x) / scale;
      const boardDraggedDistanceY = (e.pageY - stickyBoardRef.startBoardMouseCord.y) / scale;

      // caluclate how much dragged form start position
      const updatedX = boardDraggedDistanceX + stickyBoardRef.startBoardCord.x;
      const updatedY = boardDraggedDistanceY + stickyBoardRef.startBoardCord.y;

      // update actual Board X,y
      dispatch(updateBoardCord({ x: updatedX, y: updatedY }));
    }

    // Note Move
    if (noteRef.draggedNote) {
      // get total note dragged distance X,y
      const noteDraggedDistanceX = (e.pageX - noteRef.startNoteMouseCord.x) / scale;
      const noteDraggedDistanceY = (e.pageY - noteRef.startNoteMouseCord.y) / scale;

      // caluclate how much note has dragged form start position
      const updateNoteX = noteDraggedDistanceX + noteRef.startNoteCord.x;
      const updateNoteY = noteDraggedDistanceY + noteRef.startNoteCord.y;
      dispatch(
        updateNoteCord({
          id: noteRef.draggedNote.id,
          x: updateNoteX,
          y: updateNoteY
        })
      );
    }
  };

  const handleMouseUp = () => {
    setActiveDraggedNote(null);
    stickyBoardRef.isDragging = false;
    noteRef.draggedNote = null;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [scale, boardX, boardY]);

  const handleDeleteNote = useCallback((id: string) => {
    dispatch(removeNote(id));
  }, []);

  const handleNoteTextChange = useCallback((e: ChangeEvent, note: NoteTypes) => {
    e.stopPropagation();
    dispatch(
      updateNotes({
        ...note,
        text: e.target.value
      })
    );
  }, []);

  const handleColorUpdate = useCallback((selectedColor: ColorType, selectedNote: NoteTypes) => {
    dispatch(
      updateNotes({
        ...selectedNote,
        color: selectedColor
      })
    );
  }, []);

  return (
    <div
      className="h-full w-full cursor-grab select-none"
      onWheel={(e) => handleMouseWheel(e)}
      onMouseDown={(e) => handleMouseDownOnBoard(e)}
    >
      {isShowGrid && (
        <InfiniteGrid
          canvasCoordinates={{
            x: boardX,
            y: boardY,
            scale
          }}
        />
      )}
      <div
        className="h-full w-full"
        style={{
          transform: `translate(${boardX}px, ${boardY}px) scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        {notes.map((note) => (
          <Note
            key={note.id}
            onDeleteNote={handleDeleteNote}
            note={note}
            onMouseDown={handleMouseDownOnNote}
            onNoteTextChange={handleNoteTextChange}
            onColorUpdate={handleColorUpdate}
            isDraggedNoteId={note.id === activeDraggedNote}
          />
        ))}
      </div>
    </div>
  );
};

export default StickyBoard;
