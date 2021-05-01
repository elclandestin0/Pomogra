// react imports
import React, { useEffect, useState } from "react";

// aframe imports
import "aframe";
import { Entity } from "aframe-react";

let ringSelection = 0;
let messageString = "";
let colorValue = "";

const RingTerminal = ({ messages, messageType }) => {
  // ring state
  const [ring, setRing] = useState(0);
  if (messageType == 0) {
    colorValue = "blue";
    messageString = "positive";
  } else if (messageType == 1) {
    colorValue = "green";
    messageString = "motivational";
  } else if (messageType == 2) {
    colorValue = "red";
    messageString = "gratitude";
  }

  // use effect updating with ring
  useEffect(() => {
  }, [ring]);
  const ringSwitch = (direction) => {
    if (direction === 0) {
      ringSelection--;
      if (ringSelection < 0) {
        ringSelection = messages.length - 1;
      }
    } else if (direction === 1) {
      ringSelection++;
      if (ringSelection > messages.length - 1) {
        ringSelection = 0;
      }
    }
    setRing(ringSelection);
  };
  return (
    <Entity>
      {/* Text label */}
      <Entity
        position="0 3 0"
        rotation="0 180 0"
        text={{ value: messageString, align: "center", color: colorValue }}
        scale="8 8 8"
      ></Entity>
      {/* Buttons to cycle between rings */}
      <Entity
        id="leftButton"
        ui-button={{ top: "arrow, darkgreen", pressed: "yellow, offset" }}
        position="-0.8 0.4 -0.2"
        rotation="0 0 90"
        scale=".175 .175 .175"
        events={{
          pressed: () => {
            ringSwitch(0);
          },
        }}
      ></Entity>
      <Entity
        id="rightButton"
        ui-button="top: arrow, darkgreen; pressed: yellow, offset"
        position="0.8 0.4 -0.2"
        rotation="0 0 -90"
        scale="0.175 0.175 0.175"
        events={{
          pressed: () => {
            ringSwitch(1);
          },
        }}
      ></Entity>
      {/* POMOGRA ring */}
      <Entity
        scale="2.5 2.5 2.5"
        position="0 2 0"
        geometry={{
          primitive: "torus",
          radius: 0.125,
          radiusTubular: 0.01,
        }}
        material={{
          color: colorValue,
        }}
        animation={{
          property: "rotation",
          dur: 1000,
          from: "0 0 0",
          to: "0 360 0",
          dir: "normal",
          easing: "linear",
          loop: true,
        }}
      ></Entity>
      {/* Message */}
      <Entity
        position="0 1.3 0"
        rotation="0 180 0"
        text={{
          value: messages[ring].message,
          align: "center",
          color: colorValue,
        }}
        scale="4 4 4"
      ></Entity>
      <Entity
        position="0 1 0"
        rotation="0 180 0"
        text={{
          value: messages[ring].owner,
          align: "center",
          color: colorValue,
        }}
        scale="3 3 3"
      ></Entity>
    </Entity>
  );
};

export default RingTerminal;
