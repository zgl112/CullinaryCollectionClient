import React from 'react';
import { Container, Divider, Grid, Header, Image } from 'semantic-ui-react';
import Navbar from './navbar';
import { Footer } from './footer';

export const Contact = () =>
    <Container className="homepage-base-container">
        <Navbar />
        <Grid columns={2}>
            <Grid.Row style={{ marginTop: '40px' }}>
                <Grid.Column style={{ paddingLeft: '400px', marginTop: '40px' }}>
                    <Image src={require('../Assets/farmCustomerService.jpg')} centered style={{ height: '450px', width: '550px' }} />
                </Grid.Column >
                <Grid.Column style={{ paddingRight: '290px', paddingTop: '50px' }}>
                    <Header as='h2' textAlign='center' style={{ color: 'black' }}>
                        Get in touch
                    </Header>
                    <Divider/>

                    <p style={{textAlign: 'center'}}>Our Culinary Collection customer service is always prepared to support you. How can we help you today?</p>
               <br/>
               <br/><br/><br/>
               <Grid columns={2}>
                        <Grid.Row >
                            <Grid.Column style={{textAlign: 'center'}}>
                                Support
                            </Grid.Column>
                            <Grid.Column>
                                support@culinarycollections.com
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column style={{textAlign: 'center'}}>
                                Partnership
                            </Grid.Column>
                            <Grid.Column>
                            partnership@culinarycollections.com
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column style={{textAlign: 'center'}}>
                                Returns and issues
                            </Grid.Column>
                            <Grid.Column>
                                returns@culinarycollections.com
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column style={{textAlign: 'center'}}>
                                Careers
                            </Grid.Column>
                            <Grid.Column>
                                careers@culinarycollections.com
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column style={{textAlign: 'center'}}>
                                Telephone
                            </Grid.Column>
                            <Grid.Column>
                               020 4124 4121
                            </Grid.Column>
                        </Grid.Row>
               </Grid>


                </Grid.Column >
            </Grid.Row >
        </Grid >
        <br />
        <br />
        <br />
        <br />

        <Footer />
    </Container>;