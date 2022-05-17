import { Camera, PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class MakeCamera {
  camera: PerspectiveCamera;
  constructor(canvas: HTMLCanvasElement) {
    // カメラを作成
    this.camera = new PerspectiveCamera(45, 800 / 600, 1, 10000);
    this.camera.position.set(0, 0, 600);

    // カメラコントローラーを作成
    const controls = new OrbitControls(this.camera, canvas);
    controls.update();
  }

  get() {
    return this.camera;
  }
}
