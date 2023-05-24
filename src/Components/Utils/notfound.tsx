import React from "react";
import { Segment, Button, Header, Icon, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
import { Footer } from "../footer";

const NotFound = () => {
  return (
    <Container className="homepage-base-container">
        <Navbar/>
    <Segment placeholder style={{paddingTop: '150px'}}>
      <Header icon>
        <Icon name="search" />
        Oops - Not sure what you're looking for!
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/shop" primary>
          Go back to shopping!
        </Button>
      </Segment.Inline>
    </Segment>
    <Footer/>
    </Container>
  );
};

export default NotFound;
