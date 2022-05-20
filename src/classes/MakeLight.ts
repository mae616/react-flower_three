import {
  Scene,
  AmbientLight,
  DirectionalLight,
  RectAreaLight,
  SpotLight,
  DirectionalLightHelper,
  SpotLightHelper,
} from "three";
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
    light.position.set(50, 150, 80);
    // light.position.set(50, -80, 80);
    const helper = new DirectionalLightHelper(light);
    light.add(helper);
    // light.castShadow = true;
    // light.shadow.mapSize.width = 2048;
    // light.shadow.mapSize.height = 2048;

    light.layers.enable(0);
    light.layers.enable(1);
    this.scene.add(light);

    // const spotlight = new SpotLight(0xffffff, 50, 2000, Math.PI / 4, 1);
    // const helper2 = new SpotLightHelper(light);
    // spotlight.position.set(50, 150, 100);
    // spotlight.target.position.set(-4, 0, -4);
    // spotlight.add(helper2);
    // // ライトに影を有効にする★
    // spotlight.castShadow = true;
    // spotlight.shadow.mapSize.width = 2048;
    // spotlight.shadow.mapSize.height = 2048;
    // this.scene.add(spotlight.target);
    // this.scene.add(spotlight);
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
