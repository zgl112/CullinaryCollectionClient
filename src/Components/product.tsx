import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Header, Image, Button } from 'semantic-ui-react';
import Navbar from './navbar';
import { Footer } from './footer';
import { RootStoreContext } from '../App/managementStore/rootStore';
import { Outlet, useParams } from 'react-router-dom';
import { LoadingComponent } from './Utils/loading';
import { ICart, IProducts } from '../App/Models/user';
import { randomUUID } from 'crypto';
import useWindowDimensions from './Utils/useDimensions';

export const Product = () => {
    const rootstore = useContext(RootStoreContext);
    const { product, getSingleProduct } = rootstore.productStore;
    const { id } = useParams();
    const { removeFromCart, addToCart, cart } = rootstore.cartStore;
    const{width} = useWindowDimensions();


    const [activeProduct, setActiveProduct] = useState<IProducts | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getSingleProduct(id!);
                setActiveProduct(product);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [cart]);

    const handleAdd = (product: IProducts) => {
        const newCartItem: ICart = {
            name: product.name,
            items: 0,
            price: product.price,
            id: product.id,
            image: product.image
        };
        addToCart(newCartItem);
    }

    const handleRemove = (product: IProducts) => {
        const newCartItem: ICart = {
            name: product.name,
            items: 0,
            price: product.price,
            id: product.id,
            image: product.image
        };
        removeFromCart(newCartItem);
    }

    if (isLoading && !product) return <LoadingComponent content="Loading product..." />;
    return (
        <Container className="homepage-base-container">
            <Navbar />
            <Container className="shoppingGrid-base-container">
            {width < 360? (<Grid divided="vertically" style={{ height: '100%', paddingTop: '100px', width: '100%', alignItems: 'center' }}>
                    <Grid.Row style={{ height: '100%' }}>
                        <Grid.Column width={8} style={{ width: '420px', height: '575px', overflow: 'hidden' }}>
                            {/* <Image src={require('../Assets/wagyu.jpg')} style={{ marginTop: '-100px' }} /> */}
                            <Image src={product!.image} />
                        </Grid.Column>
                        <Grid.Column width={8} style={{ display: 'flex', alignItems: 'center' }}>
                            <Container className="product-grid-base-container">
                                <Header as='h1' textAlign='left'>{product!.name}</Header>
                                <Header as='h5' textAlign='left'>{product!.caption}</Header>
                                <p>{product!.description}</p>
                                <Header as='h4' textAlign='left'>£{product!.price}</Header>
                                <Button.Group style={{paddingLeft: '50px'}}>
                                <Button secondary fluid onClick={() => handleAdd(product!)}>Add to basket</Button>
                                    <Button.Or text='or' />
                                    <Button  fluid onClick={() => handleRemove(product!)}>Remove</Button>
                                </Button.Group>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ height: '100%' }}>
                        <Grid.Column width={8} style={{ display: 'flex', alignItems: 'center' }}>
                            <Container className="product-grid-base-container">
                                <Header as='h5' textAlign='left'>Provenience Country: {product!.country}</Header>

                                <p>{product!.history}</p>
                            </Container>
                        </Grid.Column>
                        <Grid.Column width={8} style={{ width: '420px', height: '575px', overflow: 'hidden' }}>
                            <Image src={product!.historyImage} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>):(<Grid  style={{ paddingTop: '100px' }}>
                    <Grid.Row style={{ height: '100%' }}>
                        <Grid.Column width={16} style={{ width: '420px', height: '575px', overflow: 'hidden' }}>
                            {/* <Image src={require('../Assets/wagyu.jpg')} style={{ marginTop: '-100px' }} /> */}
                            <Image src={product!.image} />
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Container   style={{ marginTop: '-340px'}}>
                                <Header as='h1' textAlign='left'>{product!.name}</Header>
                                <Header as='h5' textAlign='left'>{product!.caption}</Header>
                                <p>{product!.description}</p>
                                <Header as='h4' textAlign='left'>£{product!.price}</Header>
                                <Button.Group style={{paddingLeft: '24px'}}>
                                <Button secondary size='mini'  onClick={() => handleAdd(product!)}>Add to basket</Button>
                                    <Button.Or text='or' />
                                    <Button   size='mini' onClick={() => handleRemove(product!)}>Remove</Button>
                                </Button.Group>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ height: '100%' }}>
                        <Grid.Column width={16} style={{ display: 'flex', alignItems: 'center' }}>
                            <Container className="product-grid-base-container">
                                <Header as='h5' textAlign='left'>Provenience Country: {product!.country}</Header>

                                <p>{product!.history}</p>
                            </Container>
                        </Grid.Column>
                        <Grid.Column width={16} style={{ width: '420px', height: '575px', overflow: 'hidden' }}>
                            <Image src={product!.historyImage} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>)}
            </Container>
            <Footer />
        </Container>
    );
}