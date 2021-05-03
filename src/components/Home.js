// react imports
import React, { useEffect, useState } from "react";

// aframe imports
import "aframe";
import "aframe-mouse-cursor-component";
import { Entity } from "aframe-react";

// eth imports
import pomogra from "../ethereum/pomogra";

// pomogra aframe components
import Ring from "./Ring";
import UserControls from "./UserControls";
import RingTerminal from "./RingTerminal";

require("./aframe/aframe-components");
let positiveMessages = [{ message: "test", paperType: "0", owner: "test" }];
let motivationMessages = [{ message: "test", paperType: "0", owner: "test" }];
let gratitudeMessages = [{ message: "test", paperType: "0", owner: "test" }];
const Home = (props) => {
  // chain state
  const [chain, setChain] = useState([]);

  useEffect(() => {
    const getContract = async () => {
      const chain = await pomogra.methods.chain().call();
      positiveMessages = chain
        .filter((paper) => paper.paperType === "0")
        .map((paper) => {
          return paper;
        });
      motivationMessages = chain
        .filter((paper) => paper.paperType === "1")
        .map((paper) => {
          return paper;
        });
      gratitudeMessages = chain
        .filter((paper) => paper.paperType === "2")
        .map((paper) => {
          return paper;
        });
      setChain(chain);
    };
    getContract();
  }, []);

  // may start delete
  const allRings = chain.map((paper, index) => {
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
      <a-sky color="#333333"></a-sky>
      <a-assets>
        <a-mixin
          id="beveled-square"
          geometry="primitive: cone; radiusTop: 0.15; radiusBottom: 0.19;height: 0.02; segmentsRadial: 4; segmentsHeight: 1"
          rotation="0 45 0"
        ></a-mixin>
        <a-mixin
          id="square"
          geometry="primitive: box; width: 0.18; height: 0.025; depth: 0.18"
          position="0 0.02 0"
        ></a-mixin>
        <a-mixin
          id="arrow"
          geometry="primitive: cone; radiusTop: 0.01; radiusBottom: 1.5; height: 2.0; segmentsRadial: 36; segmentsHeight: 36"
        ></a-mixin>
        <a-mixin id="blue" material="color: #1E2768;"></a-mixin>
        <a-mixin id="darkgreen" material="color: #22FF90;"></a-mixin>
        <a-mixin id="yellow" material="color: #FFF88E;"></a-mixin>
        <a-mixin id="offset" position="0 0.01 0"></a-mixin>
      </a-assets>
      <UserControls></UserControls>
      {/* Camera */}
      <a-camera>
        <Entity
          id="mouseCursor"
          cursor="rayOrigin: mouse"
          mouse-cursor
        ></Entity>{" "}
        <a-cursor
          id="mouseCursor"
          animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.2 0.2 0.2; to: 1 1 1"
          cursor="fuse: true; fuseTimeout: 1"
          material="color: #ffffff"
        ></a-cursor>
      </a-camera>
      {/* Walls, floor and ceiling */}
      <Entity
        geometry={{ primitive: "plane", width: 10, height: 10 }}
        position="0 0 -4"
        rotation="-90 0 0"
        material="color: blue"
      ></Entity>
      <Entity
        geometry={{ primitive: "plane", width: 10, height: 5 }}
        position="0 2.5 -9"
        rotation="0 0 0"
        material="color: yellow"
      ></Entity>
      <Entity
        geometry={{ primitive: "plane", width: 10, height: 5 }}
        position="5 2.5 -4"
        rotation="0 -90 0"
        material="color: green"
      ></Entity>
      <Entity
        geometry={{ primitive: "plane", width: 10, height: 5 }}
        position="-5 2.5 -4"
        rotation="0 90 0"
        material="color: purple"
      ></Entity>
      <Entity
        geometry={{ primitive: "plane", width: 10, height: 5 }}
        position="0 2.5 1"
        rotation="0 -180 0"
        material="color: red"
      ></Entity>
      <Entity
        geometry={{ primitive: "plane", width: 10, height: 10 }}
        position="0 5 -4"
        rotation="90 0 0"
        material="color: #7BC8A4"
      ></Entity>
      {/* Rings */}
      <Entity position="-2 3 -4">{allRings}</Entity>
      {/* Ring terminals */}
      {positiveMessages.length > 0 && (
        <Entity position="4.5 0 -4" rotation="0 90 0">
          <RingTerminal
            messages={positiveMessages}
            messageType={0}
          ></RingTerminal>
        </Entity>
      )}
      {motivationMessages.length > 0 && (
        <Entity position="0 0 0.3">
          <RingTerminal
            messages={motivationMessages}
            messageType={1}
          ></RingTerminal>
        </Entity>
      )}
      {gratitudeMessages.length > 0 && (
        <Entity position="-4.5 0 -4" rotation="0 -90 0">
          <RingTerminal
            messages={gratitudeMessages}
            messageType={2}
          ></RingTerminal>
        </Entity>
      )}
    </a-scene>
  );
};
export default Home;
