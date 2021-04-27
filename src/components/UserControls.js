// react imports
import React from "react";

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
  let message = "";
  const setMessage = (_message) => {
    message = _message;
  };

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
      {/* VR Hands */}
      {/* <Entity
        id="leftHand"
        hand-controls="hand: left; handModelStyle: lowPoly; color: #ffcccc"
      ></Entity>
      <Entity
        id="rightHand"
        hand-controls="hand: right; handModelStyle: lowPoly; color: #ffcccc"
      ></Entity> */}
      <a-entity id="hand" laser-controls="hand: right;">
        {/* <a-sphere radius="0.03"></a-sphere> */}
      </a-entity>
      <a-entity id="hand" laser-controls="hand: left;">
        {/* <a-sphere radius="0.03"></a-sphere> */}
      </a-entity>
      {/* Keyboard */}
      <Entity
        id="keyboard"
        super-keyboard="hand: #hand"
        position="0 1.3 -1.2"
        rotation="-30 0 0"
        // events={{
        //   superkeyboardchange: (e) => {
        //     setMessage(e.detail.value);
        //   },
        // }}
      ></Entity>
      {/* Button */}
      <Entity
        id="button"
        ui-button="base: beveled-square, blue; top: square, darkgreen; pressed: yellow, offset"
        position="0 1 -1"
        rotation="30 0 0"
        events={{
          pressed: () => {
            // sendMessage();
          },
        }}
      >
        <Entity
          text={{ value: "SEND" }}
          rotation="-90 0 0"
          position="0.475 0.04 0"
        ></Entity>
      </Entity>
    </Entity>
  );
};

export default UserControls;
