import React, { useRef, useState } from "react";
import CanvasComponent from "../../components/canvas/CanvasComponent";
import { imageData } from "../../components/canvas/imageData";
import Download from "../../components/downloadcanvas/Download";
import FileUpload from "../../components/fileupload/FileUpload";
import RadioButton from "../../components/radiobuttons/RadioButton";
import Slider from "../../components/slider/Slider";
import "./home.css";
const radioOptions = [
  {
    id: 1,
    label: "Color",
    optionOne: "Color",
    optionTwo: "Black & White",
    name: "Color",
    elementId: "color",
  },
  {
    id: 2,
    label: "Background Color",
    optionOne: "Black",
    optionTwo: "White",
    name: "BlackWhite",
    elementId: "backgroundcolor",
  },
];

const Home = () => {
  const [selectedBackgroundColor, setSelectedBackgroundColor] =
    useState("Black");
  const [selectedColor, setSelectedColor] = useState("Color");
  const [sliderLabelText, setSliderLabelText] = useState("Original image");
  const [rangeValue, setRangeValue] = useState(1);
  const [imageFile, setImageFile] = useState(imageData);
  const canvasRef = useRef(null);
  return (
    <div className="container">
      <div className="canvas-container">
        <CanvasComponent
          imageData={imageFile}
          selectedColor={selectedColor}
          selectedBackgroundColor={selectedBackgroundColor}
          rangeValue={rangeValue}
          ref={canvasRef}
        />
      </div>
      <div className="controls">
        <p style={{ fontSize: "1.2rem", letterSpacing: 2 }}>
          Change the resolution in the below options before changing anything
          else to see the effect. if you see blank screen after uploading an
          image or while cycling through effects, please change the effects and
          it will re-appear . (<strong>sometimes it breaks</strong>)
          <br />
          (Please upload a small image with not much background details for the
          best result)
        </p>
        <div>
          <FileUpload setImageFile={setImageFile} />
        </div>
        <div className="controls-resolution controls-styles">
          <Slider
            label={sliderLabelText}
            setRangeValue={setRangeValue}
            rangeValue={rangeValue}
            setSliderLabelText={setSliderLabelText}
          />
        </div>
        {radioOptions.map((item) => {
          return (
            <div key={item.id} className="controls-color controls-styles">
              <RadioButton
                optionOne={item.optionOne}
                optionTwo={item.optionTwo}
                label={item.label}
                name={item.name}
                selectedValue={
                  item.id === 1 ? selectedColor : selectedBackgroundColor
                }
                setSelectedValue={
                  item.id === 1 ? setSelectedColor : setSelectedBackgroundColor
                }
                elementId={item.elementId}
              />
            </div>
          );
        })}
        <div className="download-button-container">
          <Download ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default Home;
