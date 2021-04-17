import web3 from './web3';
import Pomogra from './artifacts/contracts/Pomogra.sol/Pomogra.json';

// we need the contract address and abi to export our contract
// well. 
const contractAddress = '0x8FCAa825696bF873Bb45aA5dd3E9C8baC3C819DD';
const abi = Pomogra.abi;
const instance = new web3.eth.Contract(abi, contractAddress);
export default instance;