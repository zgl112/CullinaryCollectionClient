
import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Grid, Header, List, Segment } from 'semantic-ui-react';
import useWindowDimensions from './Utils/useDimensions';

export const Footer = () => {
    
    const{width} = useWindowDimensions();
    
    return(


    width < 360 ? (<Segment inverted color='black' vertical style={{ padding: '2em 0' }} >
        <Grid inverted centered columns={4} verticalAlign="middle" style={{ padding: '2em 0' }}>
            <Grid.Column style={{ paddingLeft: '120px', borderRight: '1px solid grey' }}>
                <List link inverted>
                    <Header as='h4' inverted> Store</Header>
                    <List.Item as="a" href="/">Home</List.Item>
                    <List.Item as="a" href="/about">About</List.Item>
                    <List.Item as="a" href="/recipes">Recipes</List.Item>
                    <List.Item as="a" href="/contact">Contact</List.Item>
                </List>
            </Grid.Column>

            <Grid.Column style={{ paddingLeft: '120px', borderRight: '1px solid grey' }}>
                <List link inverted>
                    <Header as='h4' inverted> Shop</Header>
                    <List.Item as="a">All</List.Item>
                    <List.Item as="a">Fine Cut Meats</List.Item>
                    <List.Item as="a">Fish</List.Item>
                    <List.Item as="a">Cheese</List.Item>
                </List>
            </Grid.Column>
            <Grid.Column style={{ paddingLeft: '120px', borderRight: '1px solid grey' }}>
                <List link inverted>
                    <Header as='h4' inverted>Shop by Country</Header>
                    <List.Item as="a">United Kingdom</List.Item>
                    <List.Item as="a">Italy</List.Item>
                    <List.Item as="a">Japan</List.Item>
                    <List.Item as="a">France</List.Item>
                </List>
            </Grid.Column>
            <Grid.Column style={{ paddingLeft: '120px' }}>
                <List link inverted>
                    <Header as='h4' inverted>Help</Header>
                    <List.Item as="a">Contact</List.Item>
                    <Link to='/admin'>
                    <List.Item as="a">Admin Page</List.Item>
                    </Link>
               
                </List>
            </Grid.Column>
        </Grid>
        <Divider inverted />
        <Header as='h6' textAlign='center' inverted>© Culinary Collection 2023 | Alexandru Paiu</Header>

    </Segment>):(<Segment inverted color='black'  style={{ paddingRight:'260px' }} >
        <Grid inverted centered columns={4} verticalAlign="middle"><Grid.Column style={{ paddingLeft: '120px'}}>
                <List link inverted>
                    <Header as='h4' inverted> Store</Header>
                    <List.Item as="a" href="/">Home</List.Item>
                    <List.Item as="a" href="/about">About</List.Item>
                    <List.Item as="a" href="/recipes">Recipes</List.Item>
                    <List.Item as="a" href="/contact">Contact</List.Item>
                </List>
            </Grid.Column>
            </Grid>
</Segment>)
);
}



