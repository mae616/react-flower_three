import {
  Scene,
  Mesh,
  IcosahedronGeometry,
  WebGLRenderer,
  Group,
  MeshPhysicalMaterial,
  DoubleSide,
  ColorRepresentation,
} from "three";

// 滲み
export class BleedingBalls extends Group {
  constructor(scene: Scene, renderer: WebGLRenderer) {
    super();
    const color: ColorRepresentation[] = [0xd9f3ff, 0x97ddfc, 0x3bc3ff];
    for (let i = 0; i < 25; i++) {
      const ball = new BleedingBall(
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

      ball.visible = true;

      scene.add(ball);
    }

    for (let i = 0; i < 5; i++) {
      const ball = new BleedingBall(
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

      ball.visible = true;

      scene.add(ball);
    }

    for (let i = 0; i < 3; i++) {
      const ball = new BleedingBall(
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

      ball.visible = true;

      scene.add(ball);
    }

    for (let i = 0; i < 3; i++) {
      const ball = new BleedingBall(
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

      ball.visible = true;

      scene.add(ball);
    }

    for (let i = 0; i < 2; i++) {
      const ball = new BleedingBall(
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

      ball.visible = true;

      scene.add(ball);
    }

    const ball2 = new BleedingBall(scene, renderer, 12, 0x032f08).children[0];
    ball2.position.set(
      -90, // X座標
      -60, // Y座標
      5 // Z座標
    );

    ball2.visible = true;

    scene.add(ball2);

    const ball3 = new BleedingBall(scene, renderer, 7, 0x032f08).children[0];
    ball3.position.set(
      -120, // X座標
      5, // Y座標
      2 // Z座標
    );

    ball3.visible = true;

    scene.add(ball3);
  }
}

class BleedingBall extends Group {
  constructor(
    scene: Scene,
    renderer: WebGLRenderer,
    // texture: Texture,
    size: number,
    color: ColorRepresentation
  ) {
    super();

    const material3 = new MeshPhysicalMaterial({
      color: color,
      reflectivity: 1, //反射率
      transparent: true, //透明を有効に
      opacity: 0.35, //不透明度で反射具合を調整
      transmission: 0.9, //透過率
      metalness: 0.1,
      roughness: 0.1,
    });

    material3.side = DoubleSide;

    const geometry = new IcosahedronGeometry(size, 3);

    const mesh = new Mesh(geometry, material3);

    this.add(mesh);
  }
}
