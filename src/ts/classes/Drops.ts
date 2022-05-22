import { SendHandle } from "child_process";
import {
  Scene,
  Mesh,
  IcosahedronGeometry,
  WebGLRenderer,
  LinearMipmapLinearFilter,
  WebGLCubeRenderTarget,
  Group,
  MeshPhysicalMaterial,
  DoubleSide,
  Texture,
} from "three";

// 水滴
export class Drops extends Group {
  constructor(scene: Scene, renderer: WebGLRenderer) {
    super();
    const cubeRenderTarget = new WebGLCubeRenderTarget(128, {
      generateMipmaps: true,
      minFilter: LinearMipmapLinearFilter,
    });

    const bleed = new Drop(scene, renderer, cubeRenderTarget.texture, 3)
      .children[0];
    bleed.position.set(
      -108, // X座標
      3, // Y座標
      3 // Z座標
    );
    const radian = (1 / 6) * Math.PI * 2;
    bleed.rotation.y = -radian;
    bleed.rotation.z += -0.3;

    bleed.visible = true;

    scene.add(bleed);

    const bleed2 = new Drop(scene, renderer, cubeRenderTarget.texture, 2)
      .children[0];
    bleed2.position.set(
      -102, // X座標
      -3, // Y座標
      -2 // Z座標
    );
    bleed2.rotation.y = -radian;
    bleed2.rotation.z += -0.3;

    bleed2.visible = true;

    scene.add(bleed2);
  }
}

class Drop extends Group {
  constructor(
    scene: Scene,
    renderer: WebGLRenderer,
    texture: Texture,
    size: number
  ) {
    super();

    const material3 = new MeshPhysicalMaterial({
      color: 0x00ff00,
      envMap: texture,
      opacity: 1,
      transmission: 0.9,
      metalness: 0,
      roughness: 0,
    });

    material3.side = DoubleSide;

    const geometry = new IcosahedronGeometry(size, 3);

    const mesh = new Mesh(geometry, material3);

    this.add(mesh);
  }
}
