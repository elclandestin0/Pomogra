// react imports
import React, { useEffect, useState } from "react";

// aframe imports
import "aframe";
import { Entity, Scene } from "aframe-react";

// eth imports
import web3 from "./ethereum/web3";
import pomogra from "./ethereum/pomogra";

const App = () => {
  // chain state
  const [chain, setChain] = useState([]);
  useEffect(() => {
    const getContract = async () => {
      const chain = await pomogra.methods.chain().call();
      console.log(chain);
      setChain(chain);
    };
    getContract();
  }, []);
  const returnChain = chain.map((paper, index) => {
    
    const message = paper.message;
    const owner = paper.owner;
    const paperType = paper.paperType;
    
    // if the index is even, rotate x by 90 degrees
    let position = `${index / 5}, 1, 0`;
    let rotation;
    index % 2 == 0 ? rotation = "90 0 0" : rotation = "0 0 0";
    return (
      <Entity position={position} rotation={rotation} geometry="primitive: torus; radius: 0.125; radiusTubular: 0.010">
        <Entity position="0 .225 0" text={{ value: message}} geometry="primitive: plane; width: 1.030; height: 0.100;"/>
      </Entity>
    );
  });
  return (
    <Scene>
      <a-camera>
        <a-cursor material="color: #ffffff"></a-cursor>
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
