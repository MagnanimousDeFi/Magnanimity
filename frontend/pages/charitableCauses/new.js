import React, { Component } from "react";
import Router from "next/router";
import { Form, Button, Input, Message, Dropdown } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import countryList from "../../components/Categories";

class CharitableCauseNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false,
    title: "",
    details: "",
    location: "",
    causetype: ""
  };


  handleDropDownSelect = (event, data) => {
  console.log(data.value);
 };

  onSubmit = async (event) => {
    event.preventDefault();
    console.log('details: ', this.state.details);
    console.log('location: ', this.state.location);
    console.log('cause: ', this.state.causeType);
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCharitableCause(this.state.minimumContribution, this.state.title, this.state.details, this.state.location, this.state.causeType)
        .send({
          from: accounts[0],
        });

      Router.push("/");
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a CharitableCause</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum contribution</label>

            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Title</label>

            <Input
              label="Enter Organisation Name"
              labelPosition="right"
              value={this.state.title}
              onChange={(event) =>
                this.setState({ title: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Details</label>

            <Input
              label="Enter Organisation Details"
              labelPosition="right"
              value={this.state.details}
              onChange={(event) =>
                this.setState({ details: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Country of Operation</label>
            <Dropdown
              placeholder="Select Country"
              fluid
              search
              selection
              options={countryList}
              onChange={(event, data) =>
                this.setState({location: data.value})}
            />
          </Form.Field>
          <Form.Field>
            <label>Cause Type</label>
            <Input
              label="What cause are you helping?"
              labelPosition="right"
              value={this.state.causeType}
              onChange={(event) =>
                this.setState({ causeType: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CharitableCauseNew;
