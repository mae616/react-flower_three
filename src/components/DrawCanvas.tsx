import { useDrawCanvas } from "../hooks/useDrawCanvas";

function DrawCanvas(): JSX.Element {
  const { canvasRef } = useDrawCanvas();

  return (
    <canvas id="myCanvas" ref={canvasRef} className="w-full h-full"></canvas>
  );
}

export default DrawCanvas;
