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

    return {
      address: context.query.charitableCause,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      location: summary[5],
      causeType: summary[6]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
      location,
      causeType
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this charitableCause and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: "Location",
        meta: "Help here!",
        description: location,
      },
      {
        header: "Cause Type",
        meta: "Our organisations is concerned with: ",
        description: causeType,
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this charitableCause",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "CharitableCause Balance (ether)",
        description:
          "The balance is how much money this charitableCause has left to spend.",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>CharitableCause Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
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
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CharitableCauseShow;
