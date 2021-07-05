import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import CharitableCause from "../ethereum/charitableCause";

class WithdrawalRow extends Component {

  render() {
    const { Row, Cell } = Table;
    const { id, withdrawal } = this.props;

    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{withdrawal.timestamp}</Cell>
        <Cell>{withdrawal.description}</Cell>
        <Cell>{web3.utils.fromWei(withdrawal.amount, "ether")}</Cell>
        <Cell>{withdrawal.recieverAcc}</Cell>
      </Row>
    );
  }
}

export default WithdrawalRow;
