import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import CharitableCause from "../../../../ethereum/charitableCause";
import RequestRow from "../../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(context) {
    const { charitableCause } = context.query;
    const charitableCauseContract = CharitableCause(charitableCause);
    const requestCount = await charitableCauseContract.methods
      .getRequestsCount()
      .call();
    const approversCount = await charitableCauseContract.methods
      .approversCount()
      .call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return charitableCauseContract.methods.requests(index).call();
        })
    );

    return {
      address: charitableCause,
      requests,
      requestCount,
      approversCount,
    };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Requests</h3>
        <Link
          href="/charitableCauses/[charitableCause]/requests/new"
          as={`/charitableCauses/${this.props.address}/requests/new`}
        >
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Request
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests.</div>
      </Layout>
    );
  }
}

export default RequestIndex;
