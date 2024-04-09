import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import { css } from "@emotion/react";
import Canvas from "./components/Canvas";

function App() {
  return (
    <div
      css={css({
        width: "100vw",
        height: "100vh",
      })}
    >
      <Canvas></Canvas>
    </div>
  );
}

export default App;
