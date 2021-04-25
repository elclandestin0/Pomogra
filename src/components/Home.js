// react imports
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

// aframe imports
import "aframe";
import { Entity } from "aframe-react";

// eth imports
import pomogra from "../ethereum/pomogra";

// pomogra aframe components
import Ring from "./Ring";

require("./aframe/aframe-components");

const Home = (props) => {
  // chain state
  const [chain, setChain] = useState([]);

  useEffect(() => {
    const getContract = async () => {
      const chain = await pomogra.methods.chain().call();
      setChain(chain);
    };
    getContract();
  }, []);

  const returnChain = chain.map((paper, index) => {
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
      <a-entity
        id="leftHand"
        hand-controls="hand: left; handModelStyle: lowPoly; color: #ffcccc"
      ></a-entity>
      <a-entity
        id="rightHand"
        hand-controls="hand: right; handModelStyle: lowPoly; color: #ffcccc"
      ></a-entity>
      <a-camera>
        <a-cursor
          animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.2 0.2 0.2; to: 1 1 1"
          cursor="fuse: true; fuseTimeout: 1"
          material="color: #ffffff"
        ></a-cursor>
      </a-camera>
      <a-entity
        geometry="primitive: plane; width: 10; height: 10"
        position="0 0 -4"
        rotation="-90 0 0"
        material="color: #7BC8A4"
      ></a-entity>
      <Entity
        geometry="primitive: box"
        material="color: red"
        position="0 0 -5"
        scale="1 1 1"
      ></Entity>
      {returnChain}
    </a-scene>
  );
};

export default withRouter(Home);
