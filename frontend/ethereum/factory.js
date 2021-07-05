import web3 from "./web3";
import CharitableCauseFactory from "./contracts/CharitableCauseFactory.json";

const instance = new web3.eth.Contract(
  CharitableCauseFactory.abi,
  "0x6CeE54207bb33bb284eC5564B51d944dE7036743"
);

export default instance;
