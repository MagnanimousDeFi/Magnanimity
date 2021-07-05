import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import CharitableCause from "../../../../ethereum/charitableCause";
import WithdrawalRow from "../../../../components/WithdrawalRow";

class WithdrawalIndex extends Component {
  static async getInitialProps(context) {
    const { charitableCause } = context.query;
    const charitableCauseContract = CharitableCause(charitableCause);
    const withdrawalCount = await charitableCauseContract.methods
      .getWithdrawalCount()
      .call();

    const withdrawals = await Promise.all(
      Array(parseInt(withdrawalCount))
        .fill()
        .map((element, index) => {
          return charitableCauseContract.methods.withdrawals(index).call();
        })
    );

    return {
      address: charitableCause,
      withdrawals,
      withdrawalCount,
    };
  }

  renderRows() {
    return this.props.withdrawals.map((withdrawal, index) => {
      return (
        <WithdrawalRow
          key={index}
          id={index}
          withdrawal={withdrawal}
          address={this.props.address}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Withdrawals</h3>
        <Link
          href="/charitableCauses/[charitableCause]/withdrawals/new"
          as={`/charitableCauses/${this.props.address}/withdrawals/new`}
        >
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Withdrawal
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Timestamp</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.withdrawalCount} withdrawals.</div>
      </Layout>
    );
  }
}

export default WithdrawalIndex;
