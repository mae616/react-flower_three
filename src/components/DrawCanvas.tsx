import { useEffect, useRef } from "react";
import { MakeScene } from "../classes/MakeScene";
import { MakeLight } from "../classes/MakeLight";
import { MakeCamera } from "../classes/MakeCamera";
import { Flower } from "../classes/Flower";
import { Bleeding } from "../classes/Bleeding";
import { WebGLRenderer, Mesh, BoxGeometry, MeshStandardMaterial } from "three";

import { HalftonePass } from "three/examples/jsm/postprocessing/HalftonePass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
import { TexturePass } from "three/examples/jsm/postprocessing/TexturePass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

function DrawCanvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const castedCanvasElement: HTMLCanvasElement | undefined =
      (canvasRef.current as HTMLCanvasElement) ?? undefined;

    const renderer = new WebGLRenderer({
      canvas: castedCanvasElement,
    });
    // renderer.shadowMap.enabled = true;
    // シーンを作成
    const scene = new MakeScene().get();

    // カメラを作成
    const camera = new MakeCamera(castedCanvasElement).get();

    for (let i = -1; i < 2; i++) {
      const flower = new Flower();
      // flower.castShadow = true;
      flower.position.x = i * 300;
      scene.add(flower);
    }

    // // 床を作成
    // const meshFloor = new Mesh(
    //   new BoxGeometry(800, 1, 800),
    //   new MeshStandardMaterial({
    //     color: 0x4bbbfa,
    //     roughness: 0.0,
    //     // transparent: true,
    //     // opacity: 0.0,
    //   })
    // );
    // meshFloor.position.set(0, -142, 0);
    // meshFloor.rotation.x = 0.4;
    // meshFloor.receiveShadow = true;
    // scene.add(meshFloor);

    const light = new MakeLight(scene);
    light.setAmbientLight();
    light.setDirectionalLight();

    const bleeding = new Bleeding(scene, renderer);
    scene.add(bleeding);

    const params = {
      shape: 1,
      radius: 4,
      rotateR: Math.PI / 12,
      rotateB: (Math.PI / 12) * 2,
      rotateG: (Math.PI / 12) * 3,
      scatter: 0,
      blending: 1,
      blendingMode: 1,
      greyscale: false,
      disable: false,
    };
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    const halftonePass = new HalftonePass(
      window.innerWidth,
      window.innerHeight,
      params
    );
    const glitchPass = new GlitchPass();

    composer.addPass(renderPass);
    composer.addPass(halftonePass);
    composer.addPass(glitchPass);

    const tick = (): void => {
      requestAnimationFrame(tick);

      // box.rotation.x += 0.01;
      // box.rotation.y += 0.01;

      composer.render();
      // 描画
      // renderer.render(scene, camera);
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
