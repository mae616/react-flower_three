import { Group } from "three";

import { Drop } from "../classes";
import type { DropsInfo } from "./type";

// 水滴
function generateDrops(dropsInfo: DropsInfo): Group {
  const drops = new Group();

  for (let i = 0; i < dropsInfo.length; i++) {
    const { size, x, y, z } = dropsInfo[i];

    const drop = new Drop(size);
    drop.position.set(x, y, z);

    drop.visible = true;
    drops.add(drop);
  }

  return drops;
}

function getDropsInfo(): DropsInfo {
  return [
    { size: 3, x: -108, y: 3, z: 3 },
    { size: 2, x: -102, y: -3, z: -2 },
  ];
}

export { generateDrops, getDropsInfo };
