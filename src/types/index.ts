export interface PositionTypes {
  x: number;
  y: number;
}

export interface ColorType {
  id: string;
  background: string;
  border: string;
}

export interface NoteTypes {
  id: string;
  text: string;
  color: ColorType;
  position: PositionTypes;
  createdDate: string;
}
