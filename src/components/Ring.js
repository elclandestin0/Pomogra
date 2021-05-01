// react imports
import React, { useState } from "react";

// aframe imports
import "aframe";
import { Entity } from "aframe-react";
let colorValue = "";

// color value variable depending on messageType (paperType)

const Ring = ({ message, owner, paperType, index }) => {
  if (paperType == 0) {
    colorValue = "blue";
  } else if (paperType == 1) {
    colorValue = "green";
  } else if (paperType == 2) {
    colorValue = "red";
  }
  // Show state
  const [show, setShow] = useState(false);

  // show state setters
  // function showMessage(show) {
  //   setShow(show);
  // }
  // if the index is even, rotate x by 90 degrees
  let rotation;
  let position;
  index % 2 === 0 ? (rotation = "0 180 0") : (rotation = "-90 180 0");
  index % 2 === 0
    ? (position = `${index / 2.5}, 1, 0`)
    : (position = `${index / 2.5}, 1, 0`);
  let positionMessage = `${index / 5}, 1.225, 0`;
  const animationOptions = `startEvents: mouseleave; property: rotation; dur: 1000; from: 0 0 0; to: ${rotation}; dir: normal; easing: linear; loop: false;`;
  return (
    <Entity>
      <Entity
        class="clickable"
        key={index}
        position={position}
        rotation={rotation}
        scale="2 2 2"
        geometry="primitive: torus; radius: 0.125; radiusTubular: 0.010"
        animation="startEvents: mouseenter; property: rotation; dur: 1000; from: 0 0 0; to: 0 360 0; dir: normal; easing: linear; loop: true;"
        animation__back={animationOptions}
        material={{
          color: colorValue,
        }}
        // events={{
        //   mouseenter: showMessage.bind(this, true),
        //   mouseleave: showMessage.bind(this, false),
        // }}
      ></Entity>
      {show && (
        <Entity
          position={positionMessage}
          text={{ value: message }}
          geometry="primitive: plane; width: 1.030; height: 0.100;"
        />
      )}
    </Entity>
  );
};

export default Ring;
