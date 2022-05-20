import { useEffect, useRef } from "react";
import { MakeScene } from "../classes/MakeScene";
import { MakeLight } from "../classes/MakeLight";
import { MakeCamera } from "../classes/MakeCamera";
import { Flower } from "../classes/Flower";
import { Bleeding } from "../classes/Bleeding";
import { Balls } from "../classes/Balls";
import {
  WebGLRenderer,
  // Mesh,
  // BoxGeometry,
  // MeshStandardMaterial,
  // Vector2,
  // ShaderMaterial,
  Layers,
  // Object3D,
  Color,
  CanvasTexture,
} from "three";

import { HalftonePass } from "three/examples/jsm/postprocessing/HalftonePass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
// import { XAAShader } from "three/examples/jsm/shaders/XAAShader.js";
// import { TexturePass } from "three/examples/jsm/postprocessing/TexturePass";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

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
    // renderer.shadowMap.enabled = true;
    // シーンを作成
    const scene = new MakeScene().get();

    // const ENTIRE_SCENE = 0;
    // const BLOOM_SCENE = 1;

    // const bloomLayer = new Layers();
    // bloomLayer.set(BLOOM_SCENE);

    // カメラを作成
    const camera = new MakeCamera(castedCanvasElement).get();

    camera.layers.enable(0);
    camera.layers.enable(1);

    const flowers: Flower[] = [];
    const texture: CanvasTexture[] = [
      generatePetalTexture_yellow(),
      generatePetalTexture_red(),
      generatePetalTexture_blue(),
    ];
    for (let i = -1; i < 2; i++) {
      const flower = new Flower(
        scene,
        i * 300,
        //bloomLayer,
        texture[i + 1]
      );
      // flower.castShadow = true;

      scene.add(flower);
      flowers.push(flower);
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

    const balls = new Balls(scene, renderer);
    scene.add(balls);

    // const renderPass = new RenderPass(scene, camera);
    // const params = {
    //   shape: 1,
    //   radius: 4,
    //   rotateR: Math.PI / 12,
    //   rotateB: (Math.PI / 12) * 2,
    //   rotateG: (Math.PI / 12) * 3,
    //   scatter: 0,
    //   blending: 1,
    //   blendingMode: 1,
    //   greyscale: false,
    //   disable: false,
    // };
    // const composer = new EffectComposer(renderer);

    // const halftonePass = new HalftonePass(
    //   window.innerWidth,
    //   window.innerHeight,
    //   params
    // );

    // const glitchPass = new GlitchPass();

    // composer.addPass(renderPass);
    // composer.addPass(halftonePass);
    // composer.addPass(glitchPass);

    // const renderScene = new RenderPass(scene, camera);

    // const effectFXAA = new ShaderPass(CopyShader);
    // // effectFXAA.uniforms.resolution.value.set(
    // //   1 / window.innerWidth,
    // //   1 / window.innerHeight
    // // );

    // const bloomPass = new UnrealBloomPass(
    //   new Vector2(window.innerWidth, window.innerHeight),
    //   8,
    //   8,
    //   1.85
    // );
    // bloomPass.threshold = 0.21;
    // bloomPass.strength = 1.2;
    // bloomPass.radius = 0.55;
    // bloomPass.renderToScreen = true;

    // const composer = new EffectComposer(renderer);
    // composer.setSize(window.innerWidth, window.innerHeight);

    // composer.addPass(renderScene);
    // composer.addPass(effectFXAA);
    // composer.addPass(bloomPass);
    //---------
    const renderPass = new RenderPass(scene, camera);
    var bloomPass = new BloomPass(3, 25, 0.3, 380);
    var composer = new EffectComposer(renderer);
    composer.setSize(window.innerWidth, window.innerHeight);
    var effectCopy = new ShaderPass(CopyShader);
    effectCopy.renderToScreen = true;

    // composer.renderToScreen = false;
    composer.addPass(renderPass);

    composer.addPass(bloomPass);
    composer.addPass(effectCopy);

    // const finalPass = new ShaderPass(
    //   new ShaderMaterial({
    //     uniforms: {
    //       baseTexture: { value: null },
    //       bloomTexture: { value: composer.renderTarget2.texture },
    //     },
    //     defines: {},
    //   }),
    //   "baseTexture"
    // );
    // finalPass.needsSwap = true;

    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderPass);
    composer.addPass(effectCopy);

    // renderer.toneMappingExposure = Math.pow(0.9, 4.0);

    // const materials = {};
    const tick = (): void => {
      requestAnimationFrame(tick);
      // renderer.autoClear = false;
      // renderer.clear();
      // // scene.traverse(darkenNonBloomed);
      // scene.traverse(darkenNonBloomed);
      // camera.layers.set(0);

      // scene.traverse(restoreMaterial);
      // camera.layers.set(0);
      // finalComposer.render();
      // // composer.render();

      // // renderer.clearDepth();
      // camera.layers.set(1);
      // scene.background = null;
      // camera.layers.disable(0);
      // composer.render();

      // 描画
      // camera.layers.enable(1);
      // camera.layers.disable(0);
      camera.layers.enableAll();
      // // camera.layers.disable(1);
      // finalComposer.render();
      renderer.render(scene, camera);

      // renderer.clearDepth();

      // camera.layers.enableAll();
    };
    tick();

    // //@ts-ignore
    // function darkenNonBloomed(obj) {
    //   if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    //     //@ts-ignore
    //     materials[obj.uuid] = obj.material;
    //     obj.material = flowers[1];
    //   }
    // }

    // //@ts-ignore
    // function restoreMaterial(obj) {
    //   //@ts-ignore
    //   if (materials[obj.uuid]) {
    //     //@ts-ignore
    //     obj.material = materials[obj.uuid];
    //     //@ts-ignore
    //     delete materials[obj.uuid];
    //   }
    // }
    // console.log("Hello Three.js");

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
