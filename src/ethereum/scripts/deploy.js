const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const path = require("path");

require("dotenv").config();

// file stream
const fs = require("fs");

// path to Pomogra
const pomograPath = path.resolve(
  __dirname,
  "..",
  "artifacts",
  "contracts",
  "Pomogra.sol",
  "Pomogra.json"
);

const compiledPomogra = fs.readFileSync(pomograPath, "utf8");

// set up a truffle provider with our mnemonic phrase and
// rinkeby infura node
const truffleProvider = new HDWalletProvider({
  mnemonic: process.env.seed,
  providerOrUrl: process.env.api,
  chainId: 4,
});

// then inject it into web3
const web3 = new Web3(truffleProvider);

// function that deploys our contract
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account: ", accounts[0]);

  const Pomogra = await new web3.eth.Contract(JSON.parse(compiledPomogra).abi)
    .deploy({ data: JSON.parse(compiledPomogra).bytecode })
    .send({ from: accounts[0], gas: "5555555" })
    .catch((err) => console.log(err));

  // we console log the address of our new contract and save it somewhere
  console.log("contract deployed to: ", Pomogra.options.address);
};

deploy();

// 0x8FCAa825696bF873Bb45aA5dd3E9C8baC3C819DD is the contract address
