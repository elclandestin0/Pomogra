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

const UserControls = () => {
  async function log() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    await pomogra.methods.addPaper(message, 1).send({
      from: accounts[0],
    });
  }

  // message state
  const [message, setMessage] = useState("");
  const keyboardOptions = `hand: #mouseCursor, #left, #right; value: ${message}`;
  return (
    <Entity>
      {" "}
      <Entity
        id="keyboard"
        super-keyboard={keyboardOptions}
        position="0 1.3 -1.2"
        rotation="-30 0 0"
        events={{
          superkeyboardchange: (e) => {
            setMessage(e.detail.value);
            console.log(message);
          },
        }}
      ></Entity>
      <Entity
        id="button"
        ui-button="base: beveled-square, blue; top: square, darkgreen; pressed: yellow, offset"
        position="0 1 -1"
        rotation="30 0 0"
        events={{
          pressed: () => {
            log();
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
