// react imports
import React, { useEffect, useState } from "react";

// aframe imports
import "aframe";
import { Entity, Scene } from "aframe-react";

// eth imports
// import web3 from "./ethereum/web3";
import pomogra from "./ethereum/pomogra";

// pomogra aframe components
import Ring from "./components/aframe/Ring";
require("./components/aframe/show-message");

const App = () => {
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
    <Scene>
      <a-camera>
        <a-cursor
          animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.2 0.2 0.2; to: 1 1 1"
          // animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 0.2 0.2 0.2"
          // animation__mouseleave="property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 500; to: 1 1 1"
          cursor="fuse: true; fuseTimeout: 1"
          material="color: #ffffff"
        ></a-cursor>
      </a-camera>
      <Entity
        geometry="primitive: plane; width: 10; height: 10"
        position="0 0 -4"
        rotation="-90 0 0"
        material="color: #7BC8A4"
      />
      {returnChain}
    </Scene>
  );
};

export default App;
