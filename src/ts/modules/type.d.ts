export type PetalColor = "red" | "blue" | "yellow";

export type BallInfo = {
  colors: ColorRepresentation[];
  count: number;
  maxSize: number;
  x?: number;
  y?: number;
  z?: number;
}[];

export type DropInfo = {
  size: number;
  x: number;
  y: number;
  z: number;
}[];
