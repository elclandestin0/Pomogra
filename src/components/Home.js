// react imports
import React, { useEffect, useState } from "react";

// aframe imports
import "aframe";
import { Entity } from "aframe-react";

// eth imports
import pomogra from "../ethereum/pomogra";
import web3 from "../ethereum/web3";

// pomogra aframe components
import Ring from "./Ring";
import UserControls from "./UserControls";

require("./aframe/aframe-components");

const Home = (props) => {
  // chain state
  const [chain, setChain] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getContract = async () => {
      const chain = await pomogra.methods.chain().call();
      setChain(chain);
    };
    getContract();
  }, []);

  const keyboardOptions = `hand: #mouseCursor, #left, #right; value: ${message}`;

  const returnChain = chain.map((paper, index) => {
    // attributes from our smart contract
    const message = paper.message;
    const owner = paper.owner;
    const paperType = paper.paperType;

    return (
      <Ring
        message={message}
        paperType={paperType}
        owner={owner}
        index={index}
        key={index}
      ></Ring>
    );
  });
  return (
    <a-scene>
      {" "}
      <a-assets>
        <a-mixin
          id="beveled-square"
          geometry="primitive: cone; radiusTop: 0.15; radiusBottom: 0.19; height: 0.02; segmentsRadial: 4; segmentsHeight: 1"
          rotation="0 45 0"
        ></a-mixin>
        <a-mixin
          id="square"
          geometry="primitive: box; width: 0.18; height: 0.025; depth: 0.18;"
          position="0 0.02 0"
        ></a-mixin>
        <a-mixin id="blue" material="color: #1E2768;"></a-mixin>
        <a-mixin id="darkgreen" material="color: #22FF90;"></a-mixin>
        <a-mixin id="yellow" material="color: #FFF88E;"></a-mixin>
        <a-mixin id="offset" position="0 0.01 0"></a-mixin>
      </a-assets>
      {/* VR Hands */}
      <a-entity
        id="leftHand"
        hand-controls="hand: left; handModelStyle: highPoly; color: #ffcccc"
      ></a-entity>
      <a-entity
        id="rightHand"
        hand-controls="hand: right; handModelStyle: highPoly; color: #ffcccc"
      ></a-entity>
      {/* Keyboard */}
      {/* Buttons */}
      <UserControls></UserControls>
      {/* Camera */}
      <a-camera>
        <a-cursor
          id="mouseCursor"
          animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.2 0.2 0.2; to: 1 1 1"
          cursor="fuse: true; fuseTimeout: 1"
          material="color: #ffffff"
        ></a-cursor>
        <a-entity id="mouseCursor" cursor="rayOrigin: mouse"></a-entity>
      </a-camera>
      {/* Plane */}
      <a-entity
        geometry="primitive: plane; width: 10; height: 10"
        position="0 0 -4"
        rotation="-90 0 0"
        material="color: #7BC8A4"
      ></a-entity>
      {returnChain}
    </a-scene>
  );
};

export default Home;
