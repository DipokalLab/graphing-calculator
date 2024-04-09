import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import { css } from "@emotion/react";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({
    down: {
      x: 0,
      y: 0,
    },
    current: {
      x: 0,
      y: 0,
    },
  });
  const [canvasCenter, setCanvasCenter] = useState({
    down: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    },
    current: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    },
  });
  const [isMouseMove, setIsMouseMove] = useState(false);

  const resizeCanvas = () => {
    const canvas = canvasRef.current as HTMLCanvasElement;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setCanvasCenter({
      down: {
        x: window.innerWidth,
        y: window.innerHeight,
      },
      current: {
        x: window.innerWidth,
        y: window.innerHeight,
      },
    });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawCoordinate = ({ x, y }: { x: number; y: number }) => {
    clearCanvas();
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, y + canvas.height / 2);
    ctx.lineTo(canvas.width, y + canvas.height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + canvas.width / 2, 0);
    ctx.lineTo(x + canvas.width / 2, canvas.height);
    ctx.stroke();

    drawLines({ x: x, y: y });
  };

  const drawLines = ({ x, y }: { x: number; y: number }) => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.lineWidth = 0.01;

    for (let paddingX = -20; paddingX < 20; paddingX++) {
      for (let paddingY = -20; paddingY < 20; paddingY++) {
        const pd = 40;
        const pdY = paddingY * pd + (y % 400);
        const pdX = paddingX * pd + (x % 400);

        ctx.beginPath();
        ctx.moveTo(0, pdY + canvas.height / 2);
        ctx.lineTo(canvas.width, pdY + canvas.height / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(pdX + canvas.width / 2, 0);
        ctx.lineTo(pdX + canvas.width / 2, canvas.height);
        ctx.stroke();
      }
    }
  };

  const initCanvas = () => {
    resizeCanvas();
    drawCoordinate({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: any) => {
    canvasCenter.down.x = canvasCenter.current.x;
    canvasCenter.down.y = canvasCenter.current.y;
    mousePosition.down.x = e.clientX;
    mousePosition.down.y = e.clientY;

    setCanvasCenter({
      ...canvasCenter,
    });

    setMousePosition({
      ...mousePosition,
      ["current"]: {
        x: e.clientX,
        y: e.clientY,
      },
    });

    setIsMouseMove(true);
  };

  const handleMouseUp = () => {
    setIsMouseMove(false);
  };

  const handleMouseMove = (e: any) => {
    setMousePosition({
      ...mousePosition,
      ["current"]: {
        x: e.clientX,
        y: e.clientY,
      },
    });
  };

  const initEvents = () => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);
  };

  useEffect(() => {
    initCanvas();
    initEvents();
  }, []);

  useEffect(() => {
    if (isMouseMove) {
      canvasCenter.current.x =
        canvasCenter.down.x + mousePosition.current.x - mousePosition.down.x;
      canvasCenter.current.y =
        canvasCenter.down.y + mousePosition.current.y - mousePosition.down.y;

      setCanvasCenter({
        ...canvasCenter,
      });
    }
  }, [mousePosition]);

  useEffect(() => {
    if (isMouseMove) {
      drawCoordinate({
        x: canvasCenter.current.x - window.innerWidth / 2,
        y: canvasCenter.current.y - window.innerHeight / 2,
      });
    }
  }, [canvasCenter]);

  return <canvas ref={canvasRef}></canvas>;
}

export default Canvas;
