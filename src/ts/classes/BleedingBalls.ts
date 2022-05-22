import {
  Mesh,
  IcosahedronGeometry,
  MeshPhysicalMaterial,
  DoubleSide,
  ColorRepresentation,
  Group,
} from "three";

function setBallInfo(): {
  colors: ColorRepresentation[];
  count: number;
  maxSize: number;
  x?: number;
  y?: number;
  z?: number;
}[] {
  return [
    {
      colors: [0xd9f3ff, 0x97ddfc, 0x3bc3ff],
      count: 25,
      maxSize: 17,
    },
    { colors: [0xf7597b], count: 5, maxSize: 15 },
    { colors: [0xf4fa57], count: 3, maxSize: 15 },
    { colors: [0x8857fa], count: 3, maxSize: 15 },
    { colors: [0x45ff5a], count: 2, maxSize: 15 },
    { colors: [0x032f08], count: 1, maxSize: 12, x: -90, y: -60, z: 5 },
    { colors: [0x032f08], count: 1, maxSize: 7, x: 120, y: 5, z: 2 },
  ];
}

// 滲み
export class BleedingBalls extends Group {
  constructor() {
    super();
    const ballInfo = setBallInfo();

    for (let i = 0; i < ballInfo.length; i++) {
      const { colors, count, maxSize, x, y, z } = ballInfo[i];

      for (let j = 0; j < count; j++) {
        const ball = new BleedingBall(
          Math.random() * (maxSize - 3) + 3,
          colors.length === 1
            ? colors[0]
            : colors[Math.floor(Math.random() * colors.length)]
        );
        ball.position.set(
          x ? x : 500 - Math.random() * 1000,
          y ? y : 300 - Math.random() * 600,
          z ? z : 300 - Math.random() * 400
        );

        ball.visible = true;

        this.add(ball);
      }
    }
  }
}

class BleedingBall extends Mesh {
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
