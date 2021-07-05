import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import { Form, Button, Message, Input } from "semantic-ui-react";
import CharitableCause from "../../../../ethereum/charitableCause";
import web3 from "../../../../ethereum/web3";
import Layout from "../../../../components/Layout";

class WithdrawalNew extends Component {
  state = {
    amount: "",
    description: "",
    recieverAcc: "",
    loading: false,
    errorMessage: "",
  };

  static async getInitialProps(context) {
    const { charitableCause } = context.query;
    return { address: charitableCause };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const charitableCause = CharitableCause(this.props.address);
    const { description, amount, recieverAcc } = this.state;

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await charitableCause.methods
        .makeWithdrawal(web3.utils.toWei(amount, "ether"), recieverAcc, description)
        .send({ from: accounts[0], gasLimit: '1000000'});

      Router.push(
        "/charitableCauses/[charitableCause]/withdrawals",
        `/charitableCauses/${this.props.address}/withdrawals`
      );
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Link
          href="/charitableCauses/[charitableCause]/withdrawals"
          as={`/charitableCauses/${this.props.address}/withdrawals`}
        >
          <a>Back</a>
        </Link>
        <h3>Create a Withdrawal</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.amount}
              onChange={(event) => this.setState({ amount: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Reciever Account</label>
            <Input
              value={this.state.recieverAcc}
              onChange={(event) =>
                this.setState({ recieverAcc: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default WithdrawalNew;
