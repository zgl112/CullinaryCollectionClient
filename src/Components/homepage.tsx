import { Button, Container, Divider, Grid, Header, Image} from 'semantic-ui-react';
import React, { Fragment } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import { Footer } from './footer';
const FirstPage = () => (
  <Container className="homepage-container" fluid>
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '220px' }}>
      <div
        style={{

          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          width: '160px',
          height: '75px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container textAlign="center">
          <Button as={Link} to="/shop"
            inverted>
            Shop all        </Button>
        </Container>

      </div>
    </div>

  </Container>
);

const GoalsTab = () => (
  <Fragment>
    <Divider />
    <Header style={{ marginTop: '5px' }} as='h2' textAlign='center'>Our Goals</Header>
    <Divider />
    <br />
    <br />

    <Container style={{ textAlign: 'center' }}><p>Our recipe eCommerce platform offers a unique shopping experience for food enthusiasts and home chefs alike. We provide a wide range of high-quality ingredients and specialty products, carefully curated from the best producers around the world, to help you create exceptional dishes in the comfort of your own home.</p>
      <p>Our selection of products includes premium quality meats, fresh seafood, exotic spices, rare truffles, artisanal cheeses, and much more. We take great care in sourcing our ingredients, ensuring that each product is of the highest quality and freshness. </p>
      <p>We also offer a range of recipe collections and meal plans, designed to help you make the most of your ingredients and create delicious, restaurant-quality dishes in no time. Whether you're looking to impress guests with a gourmet meal or simply want to elevate your home cooking, we have something for everyone.</p>
      <p>Our user-friendly platform makes it easy to browse and purchase products, with convenient delivery options available. Our customer support team is always on hand to answer any questions you may have and provide expert advice on cooking techniques and ingredient pairings.
      </p></Container>
    <br />
    <br />

  </Fragment>);





const HomePage = () => (
  <Container className="homepage-base-container" >
    <Navbar />
    <FirstPage />
    <GoalsTab />
    <Footer />
  </Container>
);
export default HomePage;