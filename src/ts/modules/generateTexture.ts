import { CanvasTexture } from "three";
import type { PetalColor } from "./type";

function generatePetalTexture(
  petalColor: PetalColor = "red",
  width: number = 256,
  height: number = 256
): CanvasTexture {
  const { brightColor, darkColor, stripeColor } = setColors(petalColor);

  //canvas要素の生成
  var canvas = document.createElement("canvas");
  //canvas要素のサイズ
  canvas.width = width; //横幅
  canvas.height = height; //縦幅
  //コンテキストの取得
  var context = canvas.getContext("2d");

  if (context) {
    context.beginPath();

    var rectangle_color = context.createLinearGradient(100, 100, 100, 300);
    rectangle_color.addColorStop(0.0, brightColor);
    rectangle_color.addColorStop(1.0, darkColor);
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
      context.strokeStyle = stripeColor;
      context.stroke();
    }
  }

  return new CanvasTexture(canvas);
}

function setColors(petalColor: PetalColor): {
  brightColor: string;
  darkColor: string;
  stripeColor: string;
} {
  switch (petalColor) {
    case "yellow":
      return {
        brightColor: "rgb(239, 245, 76)",
        darkColor: "rgb(64, 250, 35)",
        stripeColor: "rgb(173, 184, 55)",
      };
    case "blue":
      return {
        brightColor: "rgb(127, 76, 245)",
        darkColor: "rgb(143, 35, 250)",
        stripeColor: "rgb(73, 31, 122)",
      };
    case "red":
    default:
      return {
        brightColor: "rgb(245, 76 , 112)",
        darkColor: "rgb(182, 35, 250)",
        stripeColor: "rgb(184, 55, 83)",
      };
  }
}
export { generatePetalTexture };
