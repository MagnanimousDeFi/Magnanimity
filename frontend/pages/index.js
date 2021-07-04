import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Link from "next/link";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import countryList from "../components/Categories";

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
   {//        <div className="col">
   //   <h1>Mi Casa</h1>
   //   <p>This is my house y&apos;all!</p>
   //   {countryList.map(country => <div>{country.value}</div>)}
   // </div>
 }
          <Link href="/charitableCauses/new">
            <a>
              <Button
                floated="right"
                content="Register an Organisation"
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
