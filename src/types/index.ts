export interface PositionTypes {
  x: number;
  y: number;
}

export interface NoteTypes {
  id: string;
  text: string;
  color: string;
  position: PositionTypes;
  createdDate: string;
}
