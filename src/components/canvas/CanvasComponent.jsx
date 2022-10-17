import React, { useCallback, useEffect } from "react";
import "./canvas.css";
import { AsciiEffect } from "./canvasUtils";

const CanvasComponent = React.forwardRef(
  ({ imageData, rangeValue, selectedColor, selectedBackgroundColor }, ref) => {
    const initFunction = useCallback(() => {
      (async () => {
        if (ref.current === null) return;
        const ctx = ref.current.getContext("2d");
        const image = await new Image();
        image.src = imageData;
        ref.current.height = image.height;
        ref.current.width = image.width;
        const asciiEffect = new AsciiEffect(
          ctx,
          ref.current.height || 1000,
          ref.current.width || 1000,
          image,
          selectedBackgroundColor,
          selectedColor
        );
        if (rangeValue === 1) {
          asciiEffect.drawOriginalImage();
        } else {
          asciiEffect.draw(rangeValue);
        }
      })();
    }, [imageData, rangeValue, selectedColor, selectedBackgroundColor, ref]);

    useEffect(() => {
      initFunction();
    }, [initFunction]);

    return (
      <canvas
        style={{ background: selectedBackgroundColor }}
        id="canvas"
        ref={ref}
      ></canvas>
    );
  }
);

export default CanvasComponent;
