import "./radio.css";
const ids = {
  colorone: "Color",
  colortwo: "Black & White",
  backgroundcolorone: "Black",
  backgroundcolortwo: "White",
};
const RadioButton = ({
  label,
  optionOne,
  optionTwo,
  selectedValue,
  setSelectedValue,
  name,
  elementId,
}) => {
  const handleChangeColorType = (e) => {
    setSelectedValue(ids[e.target.id]);
  };
  return (
    <div className="controls-color controls-styles">
      <label id="resolution-label">
        {label}: {selectedValue}&nbsp;
      </label>
      <div className="radio-buttons">
        <label htmlFor={`${elementId}one`}>{optionOne}</label>
        <input
          onChange={(e) => handleChangeColorType(e)}
          type="radio"
          name={name}
          id={`${elementId}one`}
          checked={
            label === "Color"
              ? selectedValue === ids.colorone
              : selectedValue === ids.backgroundcolorone
          }
        />
      </div>
      <div className="radio-buttons">
        <label htmlFor={`${elementId}two`}>{optionTwo}</label>
        <input
          onChange={(e) => handleChangeColorType(e)}
          type="radio"
          id={`${elementId}two`}
          name={name}
          checked={
            label === "Color"
              ? selectedValue === ids.colortwo
              : selectedValue === ids.backgroundcolortwo
          }
        />
      </div>
    </div>
  );
};

export default RadioButton;
