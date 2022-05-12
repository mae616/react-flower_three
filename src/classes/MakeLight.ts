import { Scene, AmbientLight, DirectionalLight, RectAreaLight } from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export class MakeLight {
  scene: Scene;
  constructor(scene: Scene) {
    this.scene = scene;
  }

  setAmbientLight() {
    // 環境光源を作成
    const ambientLight = new AmbientLight(0x404040, 2);
    this.scene.add(ambientLight);
  }

  setDirectionalLight() {
    // 平行光源を生成
    const light = new DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    this.scene.add(light);
  }

  // 滲み
  setBleeding() {
    // 平行光源を生成
    const light = new RectAreaLight(0xff00ff, 5.0, 15, 15);
    light.position.set(-40, 105, 100);
    light.rotation.x = 160;
    const helper = new RectAreaLightHelper(light);
    light.add(helper);
    this.scene.add(light);
  }
}
