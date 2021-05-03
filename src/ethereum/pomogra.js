import web3 from './web3';
import Pomogra from './artifacts/contracts/Pomogra.sol/Pomogra.json';

// we need the contract address and abi to export our contract
// well. 
const contractAddress = '0x9f38EE944B80A973025daF915383b4d83Bf7b729';
const abi = Pomogra.abi;
const instance = new web3.eth.Contract(abi, contractAddress);
export default instance;