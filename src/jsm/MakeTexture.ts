import { CanvasTexture } from "three";

function generatePetalTexture(
  width: number = 256,
  height: number = 256
): THREE.Texture {
  //canvas要素の生成
  var canvas = document.createElement("canvas");
  //canvas要素のサイズ
  canvas.width = width; //横幅
  canvas.height = height; //縦幅
  //コンテキストの取得
  var context = canvas.getContext("2d");

  if (context) {
    context.beginPath();
    // context.fillStyle = "rgb(255, 255, 0)";

    var rectangle_color = context.createLinearGradient(100, 100, 100, 300);
    rectangle_color.addColorStop(0.0, "rgb(245, 76 , 112)");
    rectangle_color.addColorStop(1.0, "rgb(182, 35, 250)");
    context.fillStyle = rectangle_color;
    context.fillRect(0, 0, 256, 256);

    // 縦線
    const interval = 10;
    const max = Math.floor(width / interval);
    for (let i = 1; i < max; i++) {
      const positionX = i * interval;
      context.beginPath();
      context.moveTo(positionX, 0);
      context.lineTo(positionX, height);
      context.lineWidth = 0.3;
      context.strokeStyle = "rgb(184, 55, 83)";
      context.stroke();
    }
  }

  // document.body.appendChild(canvas);

  return new CanvasTexture(canvas);
}

function generateLeafTexture(
  width: number = 256,
  height: number = 256
): THREE.Texture {
  //canvas要素の生成
  var canvas = document.createElement("canvas");
  //canvas要素のサイズ
  canvas.width = width; //横幅
  canvas.height = height; //縦幅
  //コンテキストの取得
  var context = canvas.getContext("2d");

  if (context) {
    context.beginPath();
    context.fillStyle = "rgb(2, 82, 11)";

    // var rectangle_color = context.createLinearGradient(100, 100, 100, 300);
    // rectangle_color.addColorStop(0.0, "rgb(245, 76 , 112)");
    // rectangle_color.addColorStop(1.0, "rgb(182, 35, 250)");
    // context.fillStyle = rectangle_color;
    context.fillRect(0, 0, 256, 256);

    // 縦線
    const interval = 10;
    const max = Math.floor(width / interval);
    for (let i = 1; i < max; i++) {
      const positionY = i * interval;
      context.beginPath();
      context.moveTo(0, positionY);
      context.lineTo(width, positionY);
      context.lineWidth = 1;
      context.strokeStyle = "rgb(255, 255, 255)";
      context.stroke();
    }
  }

  document.body.appendChild(canvas);

  return new CanvasTexture(canvas);
}

export { generatePetalTexture, generateLeafTexture };
