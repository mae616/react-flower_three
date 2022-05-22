import {
  Mesh,
  IcosahedronGeometry,
  MeshPhysicalMaterial,
  DoubleSide,
  ColorRepresentation,
} from "three";

// 滲み
export class BleedingBall extends Mesh {
  constructor(size: number, color: ColorRepresentation) {
    const material = new MeshPhysicalMaterial({
      color: color,
      reflectivity: 1, //反射率
      transparent: true, //透明を有効に
      opacity: 0.35, //不透明度で反射具合を調整
      transmission: 0.9, //透過率
      metalness: 0.1,
      roughness: 0.1,
    });

    material.side = DoubleSide;

    const geometry = new IcosahedronGeometry(size, 3);

    super(geometry, material);
  }
}
