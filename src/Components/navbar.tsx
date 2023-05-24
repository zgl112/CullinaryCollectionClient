import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Dropdown, Container, Header, Grid, Image, Divider, Label, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../App/managementStore/rootStore';
import { observer } from 'mobx-react-lite';
import { LoadingComponent } from './Utils/loading';
import Cart from './cart';
import useWindowDimensions from './Utils/useDimensions';


const Navbar: React.FC = () => {
  const rootstore = useContext(RootStoreContext);
  const { user, logout } = rootstore.userStore;
  const { calculateTotal, calculateNumbers, cart } = rootstore.cartStore;
  const{width} = useWindowDimensions();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  

  
  return (
width > 360 ? 
    (<Menu className="menu" fixed="top">
      <Menu.Item as={Link} to="/">
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/about">
        <Icon name="info" />
        About
      </Menu.Item>
      <Menu.Item as={Link} to="/shop">
        <Icon name="cart" />
        Shop
      </Menu.Item>
      <Menu.Item as={Link} to="/contact">
        <Icon name="envelope" />
        Contact
      </Menu.Item>
      <p style={{ justifyContent: 'center', paddingLeft: '517px', paddingTop: '2px', marginTop: '12px', fontFamily: 'Pacifico' }}> Culinary Collections</p>
      <Menu.Menu position="right">
        {/*  */}
        <Menu.Item>
          <Dropdown icon="shopping basket" size='large' direction='left'>
            <Dropdown.Menu >
              {/* Contents of the dropdown menu */}
              <Dropdown.Item >
                <Container className='smallContainer'>
                  <Header as='h4'>Shopping basket:</Header>
                  <Grid columns={4} >
                    <Grid.Row>
                      <Grid.Column width={6}>Products</Grid.Column>
                      <Grid.Column width={4} textAlign="center">Quantity</Grid.Column>
                      <Grid.Column width={3} style={{ paddingLeft: '52px' }} textAlign="right">Amount</Grid.Column>
                    </Grid.Row>
                    {/* Product rows */}
                    {cart && cart.map((cartItem) => (
                      <Grid.Row key={cartItem.id}>
                        <Grid.Column width={4}>{cartItem.name}</Grid.Column>
                        <Grid.Column width={8} textAlign="center">{cartItem.items}</Grid.Column>
                        <Grid.Column width={3} textAlign="right">£{cartItem.price * cartItem.items}</Grid.Column>
                      </Grid.Row>
                    ))}

                    <Divider />
                    <Grid.Row>
                      <Grid.Column width={4}></Grid.Column> {/* Empty column */}
                      <Grid.Column width={6}></Grid.Column> {/* Empty column */}
                      <Grid.Column width={1}></Grid.Column> {/* Empty column */}
                      <Grid.Column width={3} ><p><b>Total:</b> £{calculateTotal} </p></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={1}></Grid.Column> {/* Empty column */}

                      <Grid.Column width={8}>
                        <Button.Group>
                        <Link to="/checkout">
                        <Button positive>Checkout</Button>
                          </Link>
                          <Link to="/cart">
                          <Button >Review Basket</Button>
                          </Link>
                        </Button.Group>
                      </Grid.Column> {/* Empty column */}
                      <Grid.Column width={2}></Grid.Column> {/* Empty column */}
                    </Grid.Row>
                  </Grid>
              </Container>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Fragment>
          <Label color="red" circular size="mini" style={{ paddingRight: '20px' }}>
            {calculateNumbers}
          </Label></Fragment>
      </Menu.Item>

      {/*  */}

      <Menu.Item style={{ marginRight: '75px' }}>
        {user == null ? (
          <Link to="/login">
            <Icon name="user" />
            Login/Sign On
          </Link>
        ) : (
          <p>Hi, {user.name}!</p>

        )}
      </Menu.Item>
    </Menu.Menu>
    </Menu >):(<Menu fixed="top">
    <Menu.Item >
        <Link to='/cart'>
        <Icon name="shopping basket" size="large" />
        </Link>
        <Label color="red" circular size="mini">
          {calculateNumbers}
        </Label>
      </Menu.Item>
      <Menu.Item position='left' >
        <Icon name="bars" onClick={toggleMenu} />
      </Menu.Item>
      

      {isMenuOpen && (
        <Menu.Item>
          <Container style={{paddingRight:'70px'}}>
            <Menu vertical>
              <Menu.Item as={Link} to="/">
                Home
              </Menu.Item>
              <Menu.Item as={Link} to="/about">                About
              </Menu.Item>
              <Menu.Item as={Link} to="/shop">
                Shop
              </Menu.Item>
              <Menu.Item as={Link} to="/login">
                Login
              </Menu.Item>
            </Menu>
          </Container>
        </Menu.Item>
      )}
    </Menu>)
  );
};


export default observer(Navbar);

