import { useEffect, useRef } from "react";
import { MakeScene } from "../classes/MakeScene";
import { Flower } from "../classes/Flower";
import {
  WebGLRenderer,
  // Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  DirectionalLight,
  AmbientLight,
  // Color,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function DrawCanvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const castedCanvasElement: HTMLCanvasElement | undefined =
      (canvasRef.current as HTMLCanvasElement) ?? undefined;

    const renderer = new WebGLRenderer({
      canvas: castedCanvasElement,
    });

    // シーンを作成
    const scene = new MakeScene().get();

    // カメラを作成
    const camera = new PerspectiveCamera(45, 800 / 600, 1, 10000);
    camera.position.set(0, 0, 600);

    // カメラコントローラーを作成
    const controls = new OrbitControls(camera, castedCanvasElement);
    controls.update();

    const flower = new Flower();
    scene.add(flower);

    // 床を作成
    const meshFloor = new Mesh(
      new BoxGeometry(260, 1, 260),
      new MeshStandardMaterial({ color: 0xff8080, roughness: 0.0 })
    );
    meshFloor.position.set(0, -130, 0);
    scene.add(meshFloor);

    // 環境光源を作成
    const ambientLight = new AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // 平行光源を生成
    const light = new DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    const tick = (): void => {
      requestAnimationFrame(tick);

      // box.rotation.x += 0.01;
      // box.rotation.y += 0.01;

      // 描画
      renderer.render(scene, camera);
    };
    tick();

    console.log("Hello Three.js");

    // 初期化のために実行
    onResize();
    // リサイズイベント発生時に実行
    window.addEventListener("resize", onResize);

    function onResize() {
      // サイズを取得
      const width = window.innerWidth;
      const height = Math.floor(window.innerWidth * 0.5625);

      // レンダラーのサイズを調整する
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      // カメラのアスペクト比を正す
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <canvas id="myCanvas" ref={canvasRef} className="w-full h-full"></canvas>
  );
}

export default DrawCanvas;
