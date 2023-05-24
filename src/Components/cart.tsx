import { useContext } from "react";
import { RootStoreContext } from "../App/managementStore/rootStore";
import { observer } from "mobx-react-lite";
import { Footer } from "./footer";
import { Button, Container, Divider, Grid, Header } from "semantic-ui-react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import { IProducts, ICart } from "../App/Models/user";

const Cart: React.FC = () => {
    const rootstore = useContext(RootStoreContext);
    const {addToCart, removeFromCart} = rootstore.cartStore;
    const { calculateTotal, cart } = rootstore.cartStore;

    return (
        <Container className="homepage-base-container">
            <Navbar />
            <Container className="shoppingGrid-base-container">
                <Grid columns={4} style={{ marginTop: '200px', height: '60vh', border: '1px' }} >
                    <Header as='h2'>Shopping Cart</Header>

                    <Grid.Row>
                        <Grid.Column width={6}><b>Products</b></Grid.Column>
                        <Grid.Column width={4} textAlign="center"><b>Quantity</b></Grid.Column>
                        <Grid.Column width={3} style={{ paddingLeft: '52px' }} textAlign="right"><b>Amount</b></Grid.Column>
                    </Grid.Row>
                    <Divider />
                    {cart.map((cartItem) => (
                        <Grid.Row key={cartItem.id}>
                            <Grid.Column width={4}>{cartItem.name}</Grid.Column>
                            <Grid.Column width={1}>
                                <Button circular size="mini" icon="plus" onClick={() => addToCart(cartItem)} />
                            </Grid.Column>
                            <Grid.Column width={1}>
                                <Button circular icon="minus"  size="mini" onClick={() => removeFromCart(cartItem)} />
                            </Grid.Column>
                            <Grid.Column width={4} textAlign="center">{cartItem.items}</Grid.Column>
                            <Grid.Column width={3} textAlign="right">£{cartItem.price * cartItem.items}</Grid.Column>
                        </Grid.Row>
                    ))}

                    <Divider />
                    <Grid.Row>
                        <Grid.Column width={4}></Grid.Column> {/* Empty column */}
                        <Grid.Column width={6}></Grid.Column> {/* Empty column */}
                        <Grid.Column width={1}></Grid.Column> {/* Empty column */}
                        <Grid.Column width={4} textAlign="right"><p><b>Total:</b> £{calculateTotal} </p></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={1}></Grid.Column> {/* Empty column */}

                        <Grid.Column width={1}>
                            <Button.Group>
                                <Link to="/checkout">
                                   {cart.length == 0 ? <Button positive disabled>Checkout</Button>: <Button positive>Checkout</Button>} 
                                </Link>
                            </Button.Group>
                        </Grid.Column> {/* Empty column */}
                        <Grid.Column width={2}></Grid.Column> {/* Empty column */}
                    </Grid.Row>
                </Grid>
            </Container>
            <Footer />
        </Container>

    );
}

export default observer(Cart);
