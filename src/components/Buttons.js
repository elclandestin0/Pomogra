// react imports
import React from "react";

// aframe imports
import "aframe";
import { Entity } from "aframe-react";

require("aframe-ui-widgets");

const log = (value) => {
  console.log(value);
};

const Buttons = () => {
  return (
    <Entity>
      <Entity
        id="button"
        ui-button="base: beveled-square, blue; top: square, darkgreen; pressed: yellow, offset"
        position="0 1 -1"
        rotation="30 0 0"
        events={{
          pressed: log.bind(this, "a"),
        }}
      >
        <Entity
          text={{ value: "A" }}
          rotation="-90 0 0"
          position="0.475 0.04 0"
        ></Entity>
      </Entity>
    </Entity>
  );
};

export default Buttons;
