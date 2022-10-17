import React from "react";
import "./download.css";
const Download = React.forwardRef((props, ref) => {
  const clickHandler = (e) => {
    let aTag = document.createElement("a");
    aTag.download = "ascii-image.png";
    aTag.href = ref.current.toDataURL("image/png");
    aTag.click();
  };

  return (
    <button className="download-button" onClick={clickHandler}>
      Download Image
    </button>
  );
});

export default Download;
