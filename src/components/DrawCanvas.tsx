import { useEffect, useRef } from "react";
import { MakeScene } from "../classes/MakeScene";
import { MakeLight } from "../classes/MakeLight";
import { MakeCamera } from "../classes/MakeCamera";
import { Flower } from "../classes/Flower";
import { WebGLRenderer, Mesh, BoxGeometry, MeshStandardMaterial } from "three";
function DrawCanvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const castedCanvasElement: HTMLCanvasElement | undefined =
      (canvasRef.current as HTMLCanvasElement) ?? undefined;

    const renderer = new WebGLRenderer({
      canvas: castedCanvasElement,
    });
    renderer.shadowMap.enabled = true;
    // シーンを作成
    const scene = new MakeScene().get();

    // カメラを作成
    const camera = new MakeCamera(castedCanvasElement).get();

    const flower = new Flower();
    flower.castShadow = true;
    scene.add(flower);

    // 床を作成
    const meshFloor = new Mesh(
      new BoxGeometry(800, 1, 800),
      new MeshStandardMaterial({
        color: 0x4bbbfa,
        roughness: 0.0,
        // transparent: true,
        // opacity: 0.0,
      })
    );
    meshFloor.position.set(0, -142, 0);
    meshFloor.rotation.x = 0.4;
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    const light = new MakeLight(scene);
    light.setAmbientLight();
    light.setDirectionalLight();
    light.setBleeding();

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
