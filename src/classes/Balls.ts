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
  ColorRepresentation,
} from "three";

import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils.js";

// import { generatePetalTexture, generateLeafTexture } from "../jsm/MakeTexture";

// 滲み
export class Balls extends Group {
  // petal: Mesh;

  constructor(
    scene: Scene,
    renderer: WebGLRenderer //bloomLayer: Layers
  ) {
    super();
    // const cubeRenderTarget = new WebGLCubeRenderTarget(128, {
    //   generateMipmaps: true,
    //   minFilter: LinearMipmapLinearFilter,
    // });
    // const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
    // cubeCamera.renderTarget.texture.minFilter = LinearMipMapLinearFilter;
    // scene.add(cubeCamera);
    const color: ColorRepresentation[] = [0xd9f3ff, 0x97ddfc, 0x3bc3ff];
    for (let i = 0; i < 25; i++) {
      const ball = new Ball(
        scene,
        renderer,
        Math.random() * (17 - 3) + 3,
        color[Math.floor(Math.random() * color.length)]
      ).children[0];
      ball.position.set(
        500 - Math.random() * 1000, // X座標
        300 - Math.random() * 600, // Y座標
        300 - Math.random() * 400 // Z座標
      );

      // bleed2.visible = false;
      // cubeCamera.position.copy(bleed2.position);
      // cubeCamera.update(renderer, scene);

      // Render the scene
      ball.visible = true;
      // bleed2.layers.enable(2);

      scene.add(ball);
    }

    for (let i = 0; i < 5; i++) {
      const ball = new Ball(
        scene,
        renderer,
        Math.random() * (15 - 3) + 3,
        0xf7597b
      ).children[0];
      ball.position.set(
        500 - Math.random() * 1000, // X座標
        300 - Math.random() * 600, // Y座標
        300 - Math.random() * 400 // Z座標
      );

      // bleed2.visible = false;
      // cubeCamera.position.copy(bleed2.position);
      // cubeCamera.update(renderer, scene);

      // Render the scene
      ball.visible = true;
      // bleed2.layers.enable(2);

      scene.add(ball);
    }

    for (let i = 0; i < 3; i++) {
      const ball = new Ball(
        scene,
        renderer,
        Math.random() * (15 - 3) + 3,
        0xf4fa57
      ).children[0];
      ball.position.set(
        500 - Math.random() * 1000, // X座標
        300 - Math.random() * 600, // Y座標
        300 - Math.random() * 400 // Z座標
      );

      // bleed2.visible = false;
      // cubeCamera.position.copy(bleed2.position);
      // cubeCamera.update(renderer, scene);

      // Render the scene
      ball.visible = true;
      // bleed2.layers.enable(2);

      scene.add(ball);
    }

    for (let i = 0; i < 3; i++) {
      const ball = new Ball(
        scene,
        renderer,
        Math.random() * (15 - 3) + 3,
        0x8857fa
      ).children[0];
      ball.position.set(
        500 - Math.random() * 1000, // X座標
        300 - Math.random() * 600, // Y座標
        300 - Math.random() * 400 // Z座標
      );

      // bleed2.visible = false;
      // cubeCamera.position.copy(bleed2.position);
      // cubeCamera.update(renderer, scene);

      // Render the scene
      ball.visible = true;
      // bleed2.layers.enable(2);

      scene.add(ball);
    }

    for (let i = 0; i < 2; i++) {
      const ball = new Ball(
        scene,
        renderer,
        Math.random() * (15 - 3) + 3,
        0x45ff5a
      ).children[0];
      ball.position.set(
        500 - Math.random() * 1000, // X座標
        300 - Math.random() * 600, // Y座標
        300 - Math.random() * 400 // Z座標
      );

      // bleed2.visible = false;
      // cubeCamera.position.copy(bleed2.position);
      // cubeCamera.update(renderer, scene);

      // Render the scene
      ball.visible = true;
      // bleed2.layers.enable(2);

      scene.add(ball);
    }

    const ball2 = new Ball(scene, renderer, 12, 0x032f08).children[0];
    ball2.position.set(
      -90, // X座標
      -60, // Y座標
      5 // Z座標
    );

    // bleed2.visible = false;
    // cubeCamera.position.copy(bleed2.position);
    // cubeCamera.update(renderer, scene);

    // Render the scene
    ball2.visible = true;
    // bleed2.layers.enable(2);

    scene.add(ball2);

    const ball3 = new Ball(scene, renderer, 7, 0x032f08).children[0];
    ball3.position.set(
      -120, // X座標
      5, // Y座標
      2 // Z座標
    );

    // bleed2.visible = false;
    // cubeCamera.position.copy(bleed2.position);
    // cubeCamera.update(renderer, scene);

    // Render the scene
    ball3.visible = true;
    // bleed2.layers.enable(2);

    scene.add(ball3);
  }
}

class Ball extends Group {
  constructor(
    scene: Scene,
    renderer: WebGLRenderer,
    // texture: Texture,
    size: number,
    color: ColorRepresentation
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
      color: color,
      // envMap: texture,
      reflectivity: 1, //反射率
      // opacity: 0.2, //不透明度で反射具合を調整
      transparent: true, //透明を有効に
      // refractionRatio: 0.2, //屈折率
      opacity: 0.35, //不透明度で反射具合を調整
      transmission: 0.9, //透過率
      metalness: 0.1,
      roughness: 0.1,
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
    mesh.layers.set(1);

    this.add(mesh);
  }
}
