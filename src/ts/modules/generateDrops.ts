import { Group } from "three";

import { Drop } from "../classes";
import type { DropInfo } from "./type";

// 水滴
function generateDrops(dropInfo: DropInfo): Group {
  const drops = new Group();

  for (let i = 0; i < dropInfo.length; i++) {
    const { size, x, y, z } = dropInfo[i];

    const drop = new Drop(size);
    drop.position.set(x, y, z);

    // const radian = (1 / 6) * Math.PI * 2;
    // bleed.rotation.y = -radian;
    // bleed.rotation.z += -0.3;

    drop.visible = true;
    drops.add(drop);
  }

  return drops;
}

function getDropsInfo(): DropInfo {
  return [
    { size: 3, x: -108, y: 3, z: 3 },
    { size: 2, x: -102, y: -3, z: -2 },
  ];
}

export { generateDrops, getDropsInfo };
