import {
  Object3D,
  Mesh,
  // Scene,
  // Color,
  SphereGeometry,
  MeshNormalMaterial,
  Group,
} from "three";

export class Flower extends Object3D {
  // flower: Object3D;
  constructor() {
    super();
    const petalGroup = new PetalGroup();
    this.add(petalGroup);
  }

  // get() {}
}

// 花弁(花びらの集まり)
class PetalGroup extends Group {
  constructor() {
    super();

    const length = 8;
    for (let i = 0; i < length; i++) {
      // 直方体を作成
      const petal = new Petal();

      // 配置座標を計算
      const radian = (i / length) * Math.PI * 2;
      petal.position.set(
        200 * Math.cos(radian), // X座標
        30, // Y座標
        200 * Math.sin(radian) // Z座標
      );

      // グループに追加する
      this.add(petal);
    }
  }
}

// 花びら
class Petal extends Mesh {
  // petal: Mesh;
  constructor() {
    // ジオメトリを作成
    const geometry = new SphereGeometry(30, 30, 30);

    // マテリアルを作成
    const material = new MeshNormalMaterial();

    // 継承元のコンストラクターを実行
    super(geometry, material);
  }
}
