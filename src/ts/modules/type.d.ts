export type PetalColor = "red" | "blue" | "yellow";

export type BallsInfo = {
  colors: ColorRepresentation[];
  count: number;
  maxSize: number;
  x?: number;
  y?: number;
  z?: number;
}[];

export type DropsInfo = {
  size: number;
  x: number;
  y: number;
  z: number;
}[];

export type PetalColors = PetalColor[];
