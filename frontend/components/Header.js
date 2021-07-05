import React from "react";
import Link from "next/link";
import { Menu, Container, Card, Grid } from "semantic-ui-react";


const time = "00:10:00";
const items = [
  {header: '102934',
  description: "ETH"}
]
export default () => {
  return (
    <Container>
    <Menu style={{ marginTop: "10px" }}>
      <Link href="/">
        <img src="/mag_logo_2.jpeg" alt="Logo"/>
      </Link>

      <Menu.Menu position="right">
        <Link href="/">
          <a className="item">Contribute Now!</a>
        </Link>
      </Menu.Menu>
    </Menu>

    <Card centered color="orange">
      <Card.Content>
        <Card.Header> 120384 ETH</Card.Header>
        <Card.Description>  waiting to be distributed in MagPool! </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid columns={2}>
          <Grid.Column key="1" width={5}> <h3> {time} </h3></Grid.Column>
          <Grid.Column key="2" width = {11}> <p> hours till next distribution </p></Grid.Column>
       </Grid>
      </Card.Content>
    </Card>
    </Container>
  );
};
