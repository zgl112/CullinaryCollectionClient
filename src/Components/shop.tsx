import React, { useContext, useEffect, useState } from 'react';
import { Container, Divider, Grid, Header, Image, List, Pagination, PaginationProps } from 'semantic-ui-react';
import Navbar from './navbar';
import { Footer } from './footer';
import SearchForm from './Forms/search';
import { RootStoreContext } from '../App/managementStore/rootStore';
import { Link } from 'react-router-dom';
import { LoadingComponent } from './Utils/loading';
import { IProducts } from '../App/Models/user';
import useWindowDimensions from './Utils/useDimensions';

export const Shop: React.FC = () => {

    return (
        <Container className="homepage-base-container">
            <Navbar />
            <ShoppingGrid />
            <Footer />
        </Container>
    );
};

const ShoppingGrid: React.FC = () => {
    const{width} = useWindowDimensions();

    const ProductsPerPage = 8; // Number of products to show per page
    const [activePage, setActivePage] = useState<number>(1);
    const rootstore = useContext(RootStoreContext);
    const { getProducts } = rootstore.productStore;
    const [productsState, setProductState] = useState<IProducts[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [searchResults, setSearchResults] = useState<IProducts[] | null>(null);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList: IProducts[] = await getProducts();
                setProductState(productList);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [getProducts]);

    const handlePageChange = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps): void => {
        const { activePage } = data;
        if (typeof activePage === 'number') {
            setActivePage(activePage);
        }
    };

    const startIndex = (activePage - 1) * ProductsPerPage;
    const endIndex = startIndex + ProductsPerPage;
    const visibleProducts = searchResults ? searchResults.slice(startIndex, endIndex) : productsState?.slice(startIndex, endIndex) || [];

    const handleSearch = async (searchKeyword: string): Promise<void> => {
        try {
            const productList = await getProducts();
            const searchResults = productList.filter((product) =>
                product.name.toLowerCase().includes(searchKeyword.toLowerCase())
            );
            setSearchResults(searchResults);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTags = async (searchKeyword: string): Promise<void> => {
        try {
            const productList = await getProducts();
            const searchResults = productList.filter((product) =>
                product.tags.toLowerCase().includes(searchKeyword.toLowerCase())
            );
            setSearchResults(searchResults);
        } catch (error) {
            console.log(error);
        }
    };

    const sortByName = async (): Promise<void> => {

        const sortedProducts = [...visibleProducts].sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
        setSearchResults(sortedProducts);

    };

    const sortByNameDescending = (): void => {
        const sortedProducts = [...visibleProducts].sort((a, b) => b.name.localeCompare(a.name, 'en', { sensitivity: 'base' }));
        setSearchResults(sortedProducts);
      };

    if (isLoading) {
        return <LoadingComponent content="Loading products..." />;
    }

    return (
        <Container className="shoppingGrid-base-container">
            <Header style={{ marginTop: '65px' }} as="h2" textAlign="center">
                Shop
            </Header>
            <Divider />
            <Grid relaxed style={{ border: 'none' }}>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <SearchForm handleSearch={handleSearch} />
                    </Grid.Column>
                    <Grid.Column width={14} style={{ textAlign: 'right', paddingTop: '10px' }}>
                        {visibleProducts?.length && visibleProducts.length > 1 ? (
                            <p>{visibleProducts.length} products</p>
                        ) : (
                            <p>{visibleProducts?.length} product</p>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {width < 360 ? (<Grid celled>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <List link>
                            <Header as="h5">Filters</Header>
                            <List.Item as="a" onClick={() => handleTags('')}>All</List.Item>
                            <List.Item as="a" onClick={() => handleTags('meat')}>Fine Cut Meats</List.Item>
                            <List.Item as="a" onClick={() => handleTags('fish')}>Fish</List.Item>
                            <List.Item as="a" onClick={() => handleTags('spice')}>Fine Spices</List.Item>
                            <List.Item as="a" onClick={() => handleTags('vegetable')}>Vegetables</List.Item>

                        </List>
                        <br />
                        <List link>
                            <Header as="h5">Sort by</Header>
                            <List.Item as="a" onClick={sortByName}>Sort A-Z</List.Item>
                            <List.Item as="a" onClick={sortByNameDescending}>Sort Z-A</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={14} style={{ minHeight: '90vh', overflow: 'auto' }}>
                        <Grid columns={2}>
                            {visibleProducts.map((item, index) => (
                                <Grid.Column key={index}>
                                    <Link to={`/product/${item.id}`}>
                                        <div className="thumbnail-container">
                                            <Image src={item.image} />
                                        </div>
                                    </Link>
                                    <div style={{ textAlign: 'center' }}>
                                        <Grid columns={2}>
                                            <Grid.Row>
                                                <Link to={`/product/${item.id}`}>
                                                    <Grid.Column style={{ textAlign: 'left', paddingLeft: '72px' }}>{item.name}</Grid.Column>
                                                </Link>
                                                <Grid.Column style={{ textAlign: 'right', paddingLeft: '342px' }}>£{item.price}</Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </div>
                                </Grid.Column>
                            ))}
                        </Grid>
                        <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Pagination
                                activePage={activePage}
                                totalPages={Math.ceil((searchResults?.length || productsState?.length || 0) / ProductsPerPage)}
                                onPageChange={handlePageChange}
                                boundaryRange={0}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                siblingRange={1}
                            />
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>) : (<Grid celled>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <List link>
                            <Header as="h5">Filters</Header>
                            <List.Item as="a" onClick={() => handleTags('')}>All</List.Item>
                            <List.Item as="a" onClick={() => handleTags('meat')}>Fine Cut Meats</List.Item>
                            <List.Item as="a" onClick={() => handleTags('fish')}>Fish</List.Item>
                            <List.Item as="a" onClick={() => handleTags('spice')}>Fine Spices</List.Item>
                            <List.Item as="a" onClick={() => handleTags('vegetable')}>Vegetables</List.Item>

                        </List>
                        <br />
                        <List link>
                            <Header as="h5">Sort by</Header>
                            <List.Item as="a" onClick={sortByName}>Sort A-Z</List.Item>
                            <List.Item as="a" onClick={sortByNameDescending}>Sort Z-A</List.Item>
                        </List>
                        <Divider/>
                    </Grid.Column>
                    <Grid.Column width={16} style={{ minHeight: '30vh', overflow: 'auto' }}>
                        <Grid columns={1}>
                            {visibleProducts.map((item, index) => (
                                <Grid.Column key={index}>
                                    <Link to={`/product/${item.id}`}>
                                        <div className="thumbnail-container" style={{height: '150px'}}>
                                            <Image src={item.image} />
                                        </div>
                                    </Link>
                                    <div style={{ textAlign: 'center' }}>
                                        <Grid columns={2}>
                                            <Grid.Row>
                                                <Link to={`/product/${item.id}`}>
                                                    <Grid.Column style={{ textAlign: 'left', paddingLeft: '12px' }}>{item.name}</Grid.Column>
                                                </Link>
                                                <Grid.Column style={{ paddingLeft: '172px' }}>£{item.price}</Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </div>
                                </Grid.Column>
                            ))}
                        </Grid>
                        <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Pagination
                                activePage={activePage}
                                totalPages={Math.ceil((searchResults?.length || productsState?.length || 0) / ProductsPerPage)}
                                onPageChange={handlePageChange}
                                boundaryRange={0}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                siblingRange={1}
                            />
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>)}
        </Container>
    );
};
