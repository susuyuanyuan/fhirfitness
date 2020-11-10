import React from "react";

const Info = () => {
  const weight = 80;
  const height = 170;
  const bmi = ((10000 * weight) / (height * height)).toFixed(2);
  return (
    <div className="mt-3">
      <div>
        <h3>Information</h3>
      </div>
      <div className="basic-info">
        <div className="basic-info-item">
          <p>Height(kg)</p>
          <p>{height}</p>
        </div>
        <div className="basic-info-item" style={{ backgroundColor: "#fbf7f0" }}>
          <p>Weight(cm)</p>
          <p>{weight}</p>
        </div>
        <div className="basic-info-item">
          <p>BMI</p>
          <p>{bmi}</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
