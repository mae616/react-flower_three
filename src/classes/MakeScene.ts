import { Scene, Color } from "three";

export class MakeScene {
  scene: Scene;
  constructor() {
    this.scene = new Scene();
    this.scene.background = new Color(0x7dd3fc);
  }

  get() {
    return this.scene;
  }
}
