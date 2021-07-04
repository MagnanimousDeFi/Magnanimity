import web3 from "./web3";
import CharitableCauseFactory from "./contracts/CharitableCauseFactory.json";

const instance = new web3.eth.Contract(
  CharitableCauseFactory.abi,
  "0x727d88005684C92FED6013BbE20bee25E144a1a8"
);

export default instance;
