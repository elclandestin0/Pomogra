// react imports
import React, { useState } from "react";

// ETH imports
import web3 from "../ethereum/web3";
import pomogra from "../ethereum/pomogra";

// aframe imports
import "aframe";
import { Entity } from "aframe-react";
require("aframe-ui-widgets");
require("aframe-super-keyboard");

const UserControls = () => {
  // menu for user to switch between arrows
  const menuSections = [0, 1, 2];
  let currentMenuSection = 0;
  // message state
  const [message, setMessage] = useState("");
  // tx to send to our contract
  const sendMessage = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    await pomogra.methods.addPaper(message, 1).send({
      from: accounts[0],
    });
  };

  const menuSwitch = (direction) => {
    if (direction == 0) {
      console.log(
        "current menu selection before iteration:" + currentMenuSection
      );
      currentMenuSection--;
      console.log(
        "current menu selection after iteration: " + currentMenuSection
      );
      if (currentMenuSection < 0) {
        currentMenuSection = menuSections.length - 1;
        console.log(
          "adjusted value after checking gate: " + currentMenuSection
        );
      }
    } else if (direction == 1) {
      currentMenuSection++;
      if (currentMenuSection > menuSections.length - 1) {
        currentMenuSection = 0;
      }
    }
    console.log(currentMenuSection);
  };
  return (
    <Entity>
      <a-entity
        id="keyboard"
        super-keyboard="hand: #mouseCursor;"
        position="0 1.3 -1"
        rotation="-30 0 0"
        scale="2 2 2"
        events={{
          superkeyboardchange: (e) => {
            setMessage(e.detail.value);
          },
        }}
      ></a-entity>
      <a-camera mouse-cursor>
        <a-cursor></a-cursor>
      </a-camera>
      {/* Button */}
      <Entity
        id="leftButton"
        ui-button="top: arrow, darkgreen; pressed: yellow, offset"
        position="-0.5 0.8 -0.6"
        rotation="0 0 90"
        scale=".1 .1 .1"
        events={{
          pressed: () => {
            menuSwitch(0);
          },
        }}
      ></Entity>{" "}
      <Entity
        id="rightButton"
        ui-button="top: arrow, darkgreen; pressed: yellow, offset"
        position="0.5 0.8 -0.6"
        rotation="0 0 -90"
        scale="0.1 0.1 0.1"
        events={{
          pressed: () => {
            menuSwitch(1);
          },
        }}
      ></Entity>
      <Entity
        id="buttonStd"
        ui-button="base: beveled-square, blue; top: square, darkgreen; pressed: yellow, offset"
        position="0 0.8 -0.6"
        rotation="30 0 0"
        scale="1.5 1.5 1.5"
        events={{
          pressed: () => {
            sendMessage();
          },
        }}
      >
        <Entity
          text={{ value: "SEND" }}
          rotation="-90 0 0"
          position="0.445 0.04 0"
        ></Entity>
      </Entity>
    </Entity>
  );
};

export default UserControls;
