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
