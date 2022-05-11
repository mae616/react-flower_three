import { Scene, Color } from "three";

export class MakeScene {
  scene: THREE.Scene;
  constructor() {
    this.scene = new Scene();
    this.scene.background = new Color(0xffffff);
  }

  get() {
    return this.scene;
  }
}
