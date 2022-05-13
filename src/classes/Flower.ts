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
  LatheGeometry,
  DoubleSide,
  MeshBasicMaterial,
} from "three";

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
        40 * Math.cos(radian), // X座標
        -45, // Y座標
        20 * Math.sin(radian) // Z座標
      );
      leaf.rotation.z += 0.5 * -Math.cos(radian); // x軸方向に回転

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
        0.001 * Math.cos(radian), // X座標
        100, // Y座標
        0.001 * Math.sin(radian) // Z座標
      );

      petal.rotation.y = -radian;
      petal.rotation.z += 1 / length - Math.cos((1 / length) * Math.PI * 2); // x軸方向に回転

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

    var points = [];
    var height = 5;
    var count = 30;

    for (var i = 0; i < count; i++) {
      points.push(
        new Vector2(
          (Math.sin(i * 0.08) * 2 + Math.cos(i * 0.08) * 2) * 10,
          i - count + count + i * 1.8
        )
      );
    }

    var spGroup = new Group();
    spGroup.rotation.y = -Math.PI / 2;
    var material = new MeshBasicMaterial({
      color: 0xff0000,
      transparent: false,
    });
    points.forEach(function (point) {
      var spGeom = new SphereGeometry(0.2);
      var spMesh = new Mesh(spGeom, material);
      spMesh.position.set(point.x, point.y, 0);
      spGroup.add(spMesh);
    });
    this.add(spGroup);

    // add the points as a group to the scene

    var latheGeometry = new LatheGeometry(points, 50, 0, 1 * Math.PI);
    var meshMaterial = new MeshNormalMaterial();
    meshMaterial.side = DoubleSide;
    var wireFrameMat = new MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    var mesh = createMultiMaterialObject(latheGeometry, [
      meshMaterial,
      wireFrameMat,
    ]);

    this.add(mesh);

    // // ジオメトリを作成
    // const geometry = new SphereGeometry(30, 30, 30);

    // // マテリアルを作成
    // const material = new MeshNormalMaterial();

    // 継承元のコンストラクターを実行
    // super(geometry, material);
  }
}

// 茎
class Stem extends Mesh {
  // petal: Mesh;
  constructor() {
    const geometry = new CylinderGeometry(10, 10, 250, 50);

    const material = new MeshStandardMaterial({ color: 0x017a0f });

    // 継承元のコンストラクターを実行
    super(geometry, material);
  }
}

class Leaf extends Mesh {
  // petal: Mesh;
  constructor() {
    const geometry = new BoxGeometry(30, 180, 30);

    const material = new MeshStandardMaterial({ color: 0x02520b });

    // 継承元のコンストラクターを実行
    super(geometry, material);
  }
}
