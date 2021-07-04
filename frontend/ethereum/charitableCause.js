import web3 from "./web3";
import CharitableCause from "./contracts/CharitableCause.json";

export default (charitableCause) => {
  return new web3.eth.Contract(CharitableCause.abi, charitableCause);
};
