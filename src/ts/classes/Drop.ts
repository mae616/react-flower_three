import {
  Mesh,
  IcosahedronGeometry,
  Group,
  MeshPhysicalMaterial,
  DoubleSide,
  LinearMipmapLinearFilter,
  WebGLCubeRenderTarget,
} from "three";

// 水滴
export class Drops extends Group {}

export class Drop extends Mesh {
  constructor(size: number) {
    const cubeRenderTarget = new WebGLCubeRenderTarget(128, {
      generateMipmaps: true,
      minFilter: LinearMipmapLinearFilter,
    });

    const material = new MeshPhysicalMaterial({
      color: 0x00ff00,
      envMap: cubeRenderTarget.texture,
      opacity: 1,
      transmission: 0.9,
      metalness: 0,
      roughness: 0,
    });

    material.side = DoubleSide;

    const geometry = new IcosahedronGeometry(size, 3);

    super(geometry, material);
  }
}
