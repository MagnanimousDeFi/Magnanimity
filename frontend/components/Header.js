import React from "react";
import Link from "next/link";
import { Menu } from "semantic-ui-react";



export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link href="/">
        <img src="/mag_logo_2.jpeg" alt="Logo"/>
      </Link>

      <Menu.Menu position="right">
        <Link href="/">
          <a className="item">Register an Organisation</a>
        </Link>
        <Link href="/charitableCauses/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
