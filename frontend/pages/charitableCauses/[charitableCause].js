import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import CharitableCause from "../../ethereum/charitableCause";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import Link from "next/link";

class CharitableCauseShow extends Component {
  static async getInitialProps(context) {
    const charitableCause = CharitableCause(context.query.charitableCause);
    const summary = await charitableCause.methods.getSummary().call();
    const withdrawalCount = await charitableCause.methods
      .getWithdrawalCount()
      .call();
    return {
      address: context.query.charitableCause,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      title: summary[5],
      details: summary[6],
      location: summary[7],
      causeType: summary[8],
      withdrawalCount,
    };
  }

  renderCards() {
    const {
      address,
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
      title,
      details,
      location,
      causeType,
      withdrawalCount,
      withdrawals,
    } = this.props;

    const items = [
      {
        header: title,
        meta: "Address of Manager: " + manager,
        description: details,
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        meta: "Location",
        description: location,
      },
      {
        meta: "Our organisations is concerned with: ",
        description: causeType,
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by donators",
      },
      {
        header: approversCount,
        meta: "Number of Donators",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: `CharitableCause Balance (ether)`,
        description:
          "The balance is how much money this charitableCause has left to spend.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: withdrawalCount,
        meta: "withdrawals made",
        description:
          "Organisations can immediately withdraw money from their contract if they are marked as an emergency cause.",
      },
    ];

    return <Card.Group fluid items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>CharitableCause Details</h3>
        <h4>
          Contract Address:
          <Link
            href={`https://rinkeby.etherscan.io/address/${this.props.address}`}
          >
            <a target="_blank">{this.props.address}</a>
          </Link>
        </h4>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={4}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Link
                href="/charitableCauses/[charitableCause]/requests"
                as={`/charitableCauses/${this.props.address}/requests`}
              >
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link
                href="/charitableCauses/[charitableCause]/withdrawals"
                as={`/charitableCauses/${this.props.address}/withdrawals`}
              >
                <a>
                  <Button primary>View Withdrawals</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CharitableCauseShow;
