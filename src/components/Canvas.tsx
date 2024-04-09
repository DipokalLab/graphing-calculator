import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import { css } from "@emotion/react";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resizeCanvas = () => {
    const canvas = canvasRef.current as HTMLCanvasElement;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const drawCoordinate = () => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    ctx.lineWidth = 0.5;

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
  };

  const initCanvas = () => {
    resizeCanvas();
    drawCoordinate();
  };

  useEffect(() => {
    initCanvas();
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}

export default Canvas;
