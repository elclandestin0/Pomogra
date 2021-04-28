// react imports
import React, { useState, useEffect } from "react";

// ETH imports
import web3 from "../ethereum/web3";
import pomogra from "../ethereum/pomogra";

// aframe imports
import "aframe";
import { Entity } from "aframe-react";
require("aframe-ui-widgets");
require("aframe-super-keyboard");

// variable that cycles through the menu section
let messageTypeSelection = 0;
let colorValue = "blue";
let messageString = "positive";

const UserControls = () => {
  // menu for user to switch between arrows
  const messageTypes = [0, 1, 2];

  // section state
  const [section, setSection] = useState(0);
  // message state
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("section state: " + section);
  }, [section]);
  // tx to send to our contract
  const sendMessage = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    await pomogra.methods.addPaper(message, messageTypeSelection).send({
      from: accounts[0],
    });
  };

  const checkMessageType = (messageTypeSelection) => {
    if (messageTypeSelection == 0) {
      colorValue = "blue";
      messageString = "positive";
    } else if (messageTypeSelection == 1) {
      colorValue = "green";
      messageString = "motivational";
    } else if (messageTypeSelection == 2) {
      colorValue = "red";
      messageString = "gratitude";
    }
  };

  const messageTypeSwitch = (direction) => {
    if (direction === 0) {
      messageTypeSelection--;
      if (messageTypeSelection < 0) {
        messageTypeSelection = messageTypes.length - 1;
      }
    } else if (direction === 1) {
      messageTypeSelection++;
      if (messageTypeSelection > messageTypes.length - 1) {
        messageTypeSelection = 0;
      }
    }
    setSection(messageTypeSelection);
    checkMessageType(messageTypeSelection);
  };
  return (
    <Entity>
      <Entity
        id="leftButton"
        ui-button={{ top: "arrow, darkgreen", pressed: "yellow, offset" }}
        position="-0.5 0.8 -0.6"
        rotation="0 0 90"
        scale=".1 .1 .1"
        events={{
          pressed: () => {
            messageTypeSwitch(0);
          },
        }}
      ></Entity>
      <Entity
        id="rightButton"
        ui-button="top: arrow, darkgreen; pressed: yellow, offset"
        position="0.5 0.8 -0.6"
        rotation="0 0 -90"
        scale="0.1 0.1 0.1"
        events={{
          pressed: () => {
            messageTypeSwitch(1);
          },
        }}
      ></Entity>
      <Entity>
        {/* Title */}
        <Entity
          position="0 2.5 -1.2"
          text={{ value: "Create a POMOGRA ring!", align: "center" }}
          scale="4 4 4"
        />
        {/* Keyboard */}
        <Entity
          id="keyboard"
          super-keyboard={{ hand: "#mouseCursor" }}
          position="0 1.3 -1"
          rotation="-30 0 0"
          scale="2 2 2"
          events={{
            superkeyboardchange: (e) => {
              setMessage(e.detail.value);
            },
          }}
        ></Entity>
        {/* Pomogra Ring */}
        <Entity
          position="0 2 -1.2"
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
        {/* Message Type Label */}
        <Entity
          position="0 1.75 -1.2"
          text={{ value: messageString, align: "center", color: colorValue }}
          scale="2 2 2"
        />
        {/* Buttons */}
        <Entity
          id="buttonStd"
          ui-button={{
            base: "beveled-square, blue",
            top: "square, darkgreen",
            pressed: "yellow, offset",
          }}
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
    </Entity>
  );
};

export default UserControls;
