import { Scene, Color, TextureLoader } from "three";

export class MakeScene {
  scene: Scene;
  constructor() {
    this.scene = new Scene();
    const texture = new TextureLoader().load("textures/watercolor-4116932.png");
    this.scene.background = texture;
  }

  get() {
    return this.scene;
  }
}
