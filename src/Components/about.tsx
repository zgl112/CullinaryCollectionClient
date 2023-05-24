import React from 'react';
import Navbar from './navbar';
import { Container, Divider, Grid, Header, Image } from 'semantic-ui-react';
import { Footer } from './footer';
import useWindowDimensions from './Utils/useDimensions';

export const About = () => {
    const{width} = useWindowDimensions();
    


    return (
        <Container className="homepage-base-container">
            <Navbar />
            <Container className="aboutus" >
                <Header textAlign='center' style={{ paddingTop: '200px', fontSize: '5em', color: 'white' }}>Quality Ingredients, Fairly Sourced</Header>
            </Container>
            <Container className="aboutusInfo">
                <Header textAlign='center' style={{ paddingTop: '20px', fontSize: '2em', color: 'black' }}>
                    Created based on the concept of exclusivity
                </Header>
                <Divider />
                <p>Our recipe eCommerce platform offers a unique shopping experience for food enthusiasts and home chefs alike. We provide a wide range of high-quality ingredients and specialty products, carefully curated from the best producers around the world, to help you create exceptional dishes in the comfort of your own home.
                    Our selection of products includes premium quality meats, fresh seafood, exotic spices, rare truffles, artisanal cheeses, and much more.</p><p> We take great care in sourcing our ingredients, ensuring that each product is of the highest quality and freshness.
                        We also offer a range of recipe collections and meal plans, designed to help you make the most of your ingredients and create delicious, restaurant-quality dishes in no time. Whether you're looking to impress guests with a gourmet meal or simply want to elevate your home cooking, we have something for everyone.
                </p><p>Our user-friendly platform makes it easy to browse and purchase products, with convenient delivery options available. Our customer support team is always on hand to answer any questions you may have and provide expert advice on cooking techniques and ingredient pairings.</p>
                <Divider />
                <br/>
            </Container>
             {width > 360 ? (<Grid columns={2}>
                <Grid.Row >
                    <Grid.Column style={{paddingLeft: '400px', marginTop: '40px'}}>
                        <Image centered src={require('../Assets/aboutus2.jpg')} style={{height: '350px', width: '450px'}}/>
                    </Grid.Column >
                    <Grid.Column  style={{paddingRight: '590px'}}>
                    <Header as='h3' textAlign='center' style={{  color: 'black' }}>
                    About our legacy
                    </Header>
                    <p>
                At Culinary Collection, we are committed to providing our customers with the finest quality products while supporting our community and preserving the environment. Our passion for excellence in food and sustainability is at the heart of everything we do.
We believe in sourcing the highest quality ingredients from local and global farmers who share our values of fair pay and sustainable farming practices. We partner with family-owned and small-scale farms to ensure that we deliver the freshest and most flavourful products to our customers while supporting the livelihoods of farmers.
We prioritise environmentally friendly packaging and shipping options to minimise our carbon footprint. Our products are packaged in recyclable and biodegradable materials, and we offer carbon-neutral shipping options to reduce the impact of our operations on the environment.
At Culinary Collection, we are dedicated to making a positive impact on our community and environment.
                </p>
                    </Grid.Column >
                </Grid.Row >
            </Grid >):<br/>}
            <br/>
            <br/>


            <Footer />
        </Container>
    );
} 