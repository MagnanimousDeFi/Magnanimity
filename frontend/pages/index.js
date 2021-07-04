import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Link from "next/link";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";

class CharitableCauseIndex extends Component {
  static async getInitialProps() {
    const charitableCauses = await factory.methods
      .getDeployedCharitableCauses()
      .call();
    return { charitableCauses };
  }

  renderCharitableCauses() {
    const items = this.props.charitableCauses.map((charitableCause) => {
      return {
        header: charitableCause,
        description: (
          <Link
            href="/charitableCauses/[charitableCause]"
            as={`/charitableCauses/${charitableCause}`}
          >
            <a>View CharitableCause</a>
          </Link>
        ),
        fluid: true,
        style: {
          marginLeft: "0",
        },
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open CharitableCauses</h3>
          <Link href="/charitableCauses/new">
            <a>
              <Button
                floated="right"
                content="Create CharitableCause"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderCharitableCauses()}
        </div>
      </Layout>
    );
  }
}

export default CharitableCauseIndex;
