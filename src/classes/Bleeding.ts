import { SendHandle } from "child_process";
import {
  Scene,
  CubeCamera,
  Object3D,
  Mesh,
  // Scene,
  // Color,
  SphereGeometry,
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  MeshNormalMaterial,
  MeshStandardMaterial,
  CubeRefractionMapping,
  IcosahedronGeometry,
  WebGLRenderer,
  LinearMipmapLinearFilter,
  WebGLCubeRenderTarget,
  LinearMipMapLinearFilter,
  MeshLambertMaterial,
  Group,
  Vector2,
  Vector3,
  MeshPhysicalMaterial,
  LatheGeometry,
  DoubleSide,
  MeshBasicMaterial,
  Texture,
  Layers,
} from "three";

import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils.js";

import { generatePetalTexture, generateLeafTexture } from "../jsm/MakeTexture";

// 滲み
export class Bleeding extends Group {
  // petal: Mesh;

  constructor(scene: Scene, renderer: WebGLRenderer, bloomLayer: Layers) {
    super();
    const cubeRenderTarget = new WebGLCubeRenderTarget(128, {
      generateMipmaps: true,
      minFilter: LinearMipmapLinearFilter,
    });
    // const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
    // cubeCamera.renderTarget.texture.minFilter = LinearMipMapLinearFilter;
    // scene.add(cubeCamera);

    const bleed = new Bleed(scene, renderer, cubeRenderTarget.texture, 9)
      .children[0];
    bleed.position.set(
      -120, // X座標
      0, // Y座標
      5 // Z座標
    );
    const radian = (1 / 6) * Math.PI * 2;
    bleed.rotation.y = -radian;
    bleed.rotation.z += -0.3;

    // bleed.visible = false;
    // cubeCamera.position.copy(bleed.position);
    // cubeCamera.update(renderer, scene);

    // Render the scene
    bleed.visible = true;

    // bleed.layers.enable(1);
    scene.add(bleed);

    const bleed2 = new Bleed(scene, renderer, cubeRenderTarget.texture, 4)
      .children[0];
    bleed2.position.set(
      -118, // X座標
      -10, // Y座標
      2 // Z座標
    );
    bleed2.rotation.y = -radian;
    bleed2.rotation.z += -0.3;

    // bleed2.visible = false;
    // cubeCamera.position.copy(bleed2.position);
    // cubeCamera.update(renderer, scene);

    // Render the scene
    bleed2.visible = true;
    // bleed2.layers.enable(2);

    scene.add(bleed2);
  }
}

class Bleed extends Group {
  constructor(
    scene: Scene,
    renderer: WebGLRenderer,
    texture: Texture,
    size: number
  ) {
    super();

    // const cubeCamera2 = new CubeCamera(1, 1000, cubeRenderTarget);
    // cubeCamera2.renderTarget.texture.minFilter = LinearMipMapLinearFilter;
    // scene.add(cubeCamera2);
    //1つ目のcubeCameraには屈折マッピングを適用
    // cubeCamera.renderTarget.mapping = CubeRefractionMapping;
    // const material2 = new MeshBasicMaterial({
    //   color: 0xf0f0ff, //色
    //   envMap: cubeCamera.renderTarget, //屈折マッピングにしたcubeCameraで作成した環境マッピングを適用
    //   refractionRatio: 0.75, //屈折率
    // });
    //２つ目は通常のマッピング(反射マッピング)
    // const material3 = new MeshBasicMaterial({
    //   color: 0xcccccc,
    //   envMap: cubeCamera2.renderTarget.texture, //反射マッピングのcubeCameraで作成した環境マッピングを適用
    //   reflectivity: 1, //反射率
    //   opacity: 0.3, //不透明度で反射具合を調整
    //   transparent: true, //透明を有効に
    // });

    const material3 = new MeshPhysicalMaterial({
      color: 0x032f08,
      envMap: texture,
      // reflectivity: 1, //反射率
      // opacity: 0.2, //不透明度で反射具合を調整
      // transparent: true, //透明を有効に
      // refractionRatio: 0.2, //屈折率
      opacity: 1, //不透明度で反射具合を調整
      transmission: 0.6, //透過率
      metalness: 0,
      roughness: 0,
    });

    material3.side = DoubleSide;
    // const points = [];
    const count = 10;

    const h = 0.5;
    // for (let i = 0; i < count; i++) {
    //   points.push(
    //     new Vector2(
    //       (count - 1) * Math.cos(i) + (h * Math.cos((count - 10) * i)) / count,
    //       (count - 1) * Math.sin(i) + (h * Math.sin((count - 10) * i)) / count
    //     )
    //   );
    // }

    // const spGroup = new Group();
    // // spGroup.rotation.y = -Math.PI / 2;
    // const material = new MeshBasicMaterial({
    //   color: 0xffff00,
    //   transparent: false,
    // });
    // points.forEach(function (point) {
    //   const spGeom = new SphereGeometry(0.2);
    //   const spMesh = new Mesh(spGeom, material);
    //   spMesh.position.set(point.x, point.y, 0);
    //   spGroup.add(spMesh);
    // });
    // this.add(spGroup);

    // const canvasTexture = generatePetalTexture();
    // const latheGeometry = new LatheGeometry(points, 50, 0, 1 * Math.PI);
    const geometry = new IcosahedronGeometry(size, 3);
    // const wireFrameMat = new MeshPhysicalMaterial({
    //   color: 0xf54c71,
    //   opacity: 1,
    //   transmission: 0.9,
    //   // transparent: true,
    //   // map: canvasTexture,
    // });

    // wireFrameMat.side = DoubleSide;
    // wireFrameMat.side = DoubleSide;

    // wireFrameMat.map = canvasTexture;
    // wireFrameMat.map.needsUpdate = true;
    // const wireFrameMat = new MeshBasicMaterial();
    // wireFrameMat.wireframe = true;

    // const mesh = createMultiMaterialObject(latheGeometry, [wireFrameMat]);
    // const mesh = createMultiMaterialObject(latheGeometry, [material3]);
    // mesh.castShadow = true;
    // mesh.receiveShadow = true;
    const mesh = new Mesh(geometry, material3);

    // mesh.layers.disable(0);
    mesh.layers.enable(1);

    this.add(mesh);
  }
}
