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
    <a-scene cursor="rayOrigin: mouse">
      <a-sky color="#333333"></a-sky>{" "}
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
      <a-camera mouse-cursor>
        <Entity id="mouseCursor" cursor="rayOrigin: mouse"></Entity>
      </a-camera>
      {/* Plane */}
      <Entity
        geometry={{ primitive: "plane", width: 10, height: 10 }}
        position="0 0 -4"
        rotation="-90 0 0"
        material="color: #7BC8A4"
      ></Entity>
      {returnChain}
    </a-scene>
  );
};

export default Home;
