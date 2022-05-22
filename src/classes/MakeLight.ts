import {
  Scene,
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
} from "three";

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
    light.position.set(50, 150, 80);
    const helper = new DirectionalLightHelper(light);
    light.add(helper);

    light.layers.enable(0);
    light.layers.enable(1);
    this.scene.add(light);
  }
}
