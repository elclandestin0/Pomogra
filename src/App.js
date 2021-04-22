// react imports
import React, { useEffect, useState } from "react";

// aframe imports
import "aframe";
import "aframe-gui";
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
      <a-gui-input
        width="2.5"
        height="0.75"
        // font-family="assets/fonts/PermanentMarker-Regular.ttf"
        font-size="0.2"
        value="123"
        margin="0 0 0.05 0"
        position="0 1 0"
      ></a-gui-input>
      <a-camera>
        <a-cursor
          animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.2 0.2 0.2; to: 1 1 1"
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
