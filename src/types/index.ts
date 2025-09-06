export interface PositionTypes {
  x: number;
  y: number;
}

export interface ColorType {
  id: string;
  background: string;
  border: string;
  dark: string;
}

export interface NoteTypes {
  id: string;
  text: string;
  color: ColorType;
  position: PositionTypes;
  createdDate: string;
}

export type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

export interface BoardRef {
  isDragging: boolean;
  startBoardCord: PositionTypes;
  startBoardMouseCord: PositionTypes;
}

export interface NoteRef {
  draggedNote: null | NoteTypes;
  startNoteCord: PositionTypes;
  startNoteMouseCord: PositionTypes;
}

export interface UpdateNoteAction extends PositionTypes {
  id: string;
}
