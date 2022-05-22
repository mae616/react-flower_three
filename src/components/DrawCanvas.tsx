import { useEffect, useRef } from "react";
import { MakeScene } from "../classes/MakeScene";
import { MakeLight } from "../classes/MakeLight";
import { MakeCamera } from "../classes/MakeCamera";
import { Flower } from "../classes/Flower";
import { Drops } from "../classes/Drops";
import { BleedingBalls } from "../classes/BleedingBalls";
import { WebGLRenderer, CanvasTexture } from "three";

import { HalftonePass } from "three/examples/jsm/postprocessing/HalftonePass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

import {
  generatePetalTexture_red,
  generatePetalTexture_yellow,
  generatePetalTexture_blue,
} from "../jsm/MakeTexture";

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
    const camera = new MakeCamera(castedCanvasElement).get();

    const flowers: Flower[] = [];
    const texture: CanvasTexture[] = [
      generatePetalTexture_yellow(),
      generatePetalTexture_red(),
      generatePetalTexture_blue(),
    ];
    for (let i = -1; i < 2; i++) {
      const flower = new Flower(scene, i * 300, texture[i + 1]);

      scene.add(flower);
      flowers.push(flower);
    }

    const light = new MakeLight(scene);
    light.setAmbientLight();
    light.setDirectionalLight();

    const drops = new Drops(scene, renderer);
    scene.add(drops);

    const bleedingBalls = new BleedingBalls(scene, renderer);
    scene.add(bleedingBalls);

    // {
    //   const renderPass = new RenderPass(scene, camera);
    //   const params = {
    //     shape: 1,
    //     radius: 4,
    //     rotateR: Math.PI / 12,
    //     rotateB: (Math.PI / 12) * 2,
    //     rotateG: (Math.PI / 12) * 3,
    //     scatter: 0,
    //     blending: 1,
    //     blendingMode: 1,
    //     greyscale: false,
    //     disable: false,
    //   };
    //   const composer = new EffectComposer(renderer);
    //   const halftonePass = new HalftonePass(
    //     window.innerWidth,
    //     window.innerHeight,
    //     params
    //   );
    //   const effectFilm = new FilmPass(0.8, 0.325, 256, 0);
    //   // const glitchPass = new GlitchPass();
    //   composer.addPass(renderPass);
    //   composer.addPass(halftonePass);
    //   composer.addPass(effectFilm);
    // }
    const tick = (): void => {
      requestAnimationFrame(tick);

      renderer.render(scene, camera);
      // composer.render();
    };
    tick();

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
