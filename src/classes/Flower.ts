import {
  Object3D,
  Mesh,
  // Scene,
  // Color,
  SphereGeometry,
  BoxGeometry,
  CylinderGeometry,
  MeshNormalMaterial,
  MeshStandardMaterial,
  Group,
  Vector2,
  Vector3,
  LatheGeometry,
  DoubleSide,
  MeshBasicMaterial,
} from "three";

import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils.js";

export class Flower extends Object3D {
  // flower: Object3D;
  constructor() {
    super();
    const petals = new Petals();
    this.add(petals);
    petals.rotation.y = -0.5;

    const stem = new Stem();
    stem.position.y = -5;
    this.add(stem);

    this.makeLeaf();
    this.rotation.x = 0.4;
  }

  private makeLeaf() {
    const length = 2;
    for (let i = 0; i < length; i++) {
      // 直方体を作成
      const leaf = new Leaf();

      // 配置座標を計算
      const radian = (i / length) * Math.PI * 2;
      leaf.position.set(
        -120 * Math.cos(radian), // X座標
        20, // Y座標
        60 * Math.sin(radian) // Z座標
      );
      leaf.rotation.y = -radian;
      leaf.rotation.z += -1.8;
      // グループに追加する
      this.add(leaf);
    }
  }

  // get() {}
}

// 花弁(花びらの集まり)
class Petals extends Group {
  constructor() {
    super();

    const length = 6;
    for (let i = 0; i < length; i++) {
      const petal = new Petal();

      // 配置座標を計算
      const radian = (i / length) * Math.PI * 2;
      petal.position.set(
        0, // X座標
        100, // Y座標
        0 // Z座標
      );

      petal.rotation.y = -radian;
      petal.rotation.z += -0.3;

      // グループに追加する
      this.add(petal);
    }
  }
}

// 花びら
class Petal extends Group {
  // petal: Mesh;
  constructor() {
    super();

    const points = [];
    const count = 30;

    for (let i = 0; i < count; i++) {
      points.push(
        new Vector2(
          (Math.sin(i * 0.08) * 2 + Math.cos(i * 0.08) * 2) * 10,
          i - count + count + i * 1.8
        )
      );
    }

    const spGroup = new Group();
    spGroup.rotation.y = -Math.PI / 2;
    const material = new MeshBasicMaterial({
      color: 0xff0000,
      transparent: false,
    });
    points.forEach(function (point) {
      const spGeom = new SphereGeometry(0.2);
      const spMesh = new Mesh(spGeom, material);
      spMesh.position.set(point.x, point.y, 0);
      spGroup.add(spMesh);
    });
    this.add(spGroup);

    const latheGeometry = new LatheGeometry(points, 50, 0, 1 * Math.PI);
    const meshMaterial = new MeshNormalMaterial();
    meshMaterial.side = DoubleSide;
    const wireFrameMat = new MeshStandardMaterial({ color: 0xff0000 });
    // const wireFrameMat = new MeshBasicMaterial();
    // wireFrameMat.wireframe = true;

    const mesh = createMultiMaterialObject(latheGeometry, [
      meshMaterial,
      wireFrameMat,
    ]);

    this.add(mesh);
  }
}

// 茎
class Stem extends Mesh {
  // petal: Mesh;
  constructor() {
    const geometry = new CylinderGeometry(8, 8, 250, 50);

    const material = new MeshStandardMaterial({ color: 0x017a0f });

    // 継承元のコンストラクターを実行
    super(geometry, material);
  }
}

class Leaf extends Mesh {
  // petal: Mesh;
  constructor() {
    super();

    const points = [];
    let startX, startY;
    for (let i = 2; i < Math.PI; i += 0.1) {
      const r = 300 * (1 + Math.cos(i));
      const tempX = r * Math.cos(i);
      const tempY = r * Math.sin(i);
      const x = (tempX * Math.cos(50) + tempY * Math.sin(50)) * -1;
      const y = tempY * Math.cos(50) - tempX * Math.sin(50);
      if (i === 2) {
        startX = x;
        startY = y;
      }
      points.push(new Vector3(x, y, 0));
    }

    points.push(new Vector3(startX, startY, 0));
    points.push(new Vector3(startX, startY, 25));
    points.push(new Vector3(startX, startY, -25));

    const spGroup = new Group();
    const material = new MeshBasicMaterial({
      color: 0x02520b,
      transparent: false,
    });
    points.forEach(function (point) {
      const spGeom = new SphereGeometry(0.2);
      const spMesh = new Mesh(spGeom, material);
      spMesh.position.set(point.x, point.y, 0);
      spGroup.add(spMesh);
    });
    this.add(spGroup);

    const hullGeometry = new ConvexGeometry(points);
    const meshMaterial = new MeshBasicMaterial({
      color: 0x02520b,
    });
    // meshMaterial.transparent = true;
    // meshMaterial.opacity = 0.2;

    meshMaterial.side = DoubleSide;
    const wireFrameMat = new MeshStandardMaterial({ color: 0x02520b });
    // const wireFrameMat = new MeshBasicMaterial();
    // wireFrameMat.wireframe = true;

    const mesh = createMultiMaterialObject(hullGeometry, [
      meshMaterial,
      wireFrameMat,
    ]);

    this.add(mesh);
  }
}
