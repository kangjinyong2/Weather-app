import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Weatherbutton = ({ cityList, setCity, handleCityChange }) => {
  return (
    <div className="button">
      <Button
        variant={`${setCity == null ? "danger" : "secondary"}`}
        onClick={() => handleCityChange("current")}
      >
        Current Location
      </Button>
      {cityList.map((item, index) => (
        <Button
          variant={`${setCity == item ? "danger" : "secondary"}`}
          key={index}
          onClick={() => setCity(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default Weatherbutton;
