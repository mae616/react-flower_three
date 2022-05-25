import { CanvasTexture, Group } from "three";

import { Flower } from "../classes";
import type { PetalColors } from "./type";

import { generatePetalTexture } from ".";

// 花
function generateFlowers(petalColors: PetalColors): Group {
  const flowers = new Group();

  const betweenFlower = 300;
  const startPositionX = -(((petalColors.length - 1) * betweenFlower) / 2);
  for (let i = 0; i < petalColors.length; i++) {
    const petalTexture: CanvasTexture = generatePetalTexture(petalColors[i]);

    const flower = new Flower(petalTexture);

    flower.position.x = startPositionX + i * betweenFlower;
    flower.rotation.x = 0.4;

    flowers.add(flower);
  }

  return flowers;
}

function getPetalColors(): PetalColors {
  return ["yellow", "red", "blue"];
}

export { generateFlowers, getPetalColors };
