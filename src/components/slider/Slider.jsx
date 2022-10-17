import "./slider.css";
const Slider = ({ label, rangeValue, setRangeValue, setSliderLabelText }) => {
  const handleChange = (e) => {
    let value = parseInt(e.target.value);
    setRangeValue(value);
    setSliderLabelText(value === 1 ? "Original image" : `${value} px`);
  };
  return (
    <div className="controls-resolution controls-styles">
      <label htmlFor="resolution" id="resolution-label">
        Resolution: {label}&nbsp;
      </label>
      <input
        type="range"
        name="resolution"
        id="resolution"
        min="1"
        max="20"
        value={rangeValue}
        onInput={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Slider;
