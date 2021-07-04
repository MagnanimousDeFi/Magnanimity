import web3 from "./web3";
import CharitableCauseFactory from "./contracts/CharitableCauseFactory.json";

const instance = new web3.eth.Contract(
  CharitableCauseFactory.abi,
  "0xb71Cd56e8978c05a26bBFa688204AAeF6f2A202C"
);

export default instance;
