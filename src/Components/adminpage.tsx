import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Container, Form, List, Tab, Table } from 'semantic-ui-react';
import Navbar from './navbar';
import { Footer } from './footer';
import { LoginForm } from './Forms/login';
import { RegistrationForm } from './Forms/signup';
import { IProducts } from '../App/Models/user';
import { RootStoreContext } from '../App/managementStore/rootStore';
import { observer } from 'mobx-react';

const AdminPage = () => {
    const [isTrue, setIsTrue] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const rootstore = useContext(RootStoreContext);
    const { products, getProducts, addProduct, updateProduct, deleteProduct } = rootstore.productStore;
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);

    const [formValues, setFormValues] = useState<IProducts>({
        id: "",
        name: "",
        caption: "",
        description: "",
        image: "",
        history: "",
        historyImage: "",
        price: 0,
        stock: 0,
        tags: "",
        country: "",
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                 await getProducts();
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, [getProducts]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const clearForm = () => {
        setFormValues({
            id: "",
            name: "",
            caption: "",
            description: "",
            image: "",
            history: "",
            historyImage: "",
            price: 0,
            stock: 0,
            tags: "",
            country: "",
        });
    };

    const addProducts = () => {
        addProduct(formValues).then(() => {
            setIsAddMode(false);
            clearForm();
        });
    };

    const deleteProducts = (id: string) => {
        deleteProduct(id);
    };

    const editProduct = (product: IProducts) => {
        setIsEditMode(true);
        setFormValues(product);
        window.scrollTo({
            top: scrollRef.current?.offsetTop,
            behavior: 'smooth',
          });
    };

    const updateProducts = () => {
        updateProduct(formValues.id, formValues).then(() => {
            setIsEditMode(false);
            clearForm();
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEditMode) {
            updateProducts();
        } else {
            addProducts();
        }
    };


    const handleKeyword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = e.currentTarget.username.value.toLowerCase();
        const password = e.currentTarget.password.value.toLowerCase();

        setIsTrue(username === 'admin' && password === 'admin');
    };

    return (
        <Container className="homepage-base-container">
            <Navbar />
            <Container style={{ height: '100vh', width: '100%' }} >
                {!isTrue && (
                    <form onSubmit={handleKeyword} style={{ paddingLeft: '760px', paddingTop: '200px' }}>
                        <input type="text" name="username" placeholder="Enter admin user" />
                        <input type="password" name="password" placeholder="Enter password" />

                        <button type="submit">Submit</button>
                    </form>
                )}

                {isTrue && (
                    <div className="product-container" style={{ paddingTop: '60px' }} ref={scrollRef}>
                        <h2>Product Management</h2>
                        {!isEditMode && (
                            <Button onClick={() => setIsAddMode(true)}>Add New Product</Button>
                        )}
                        {(isEditMode || isAddMode) && (
                            <Form onSubmit={handleSubmit}>
                                <Form.Input
                                    label="Name"
                                    type="text"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    label="Caption"
                                    type="text"
                                    name="caption"
                                    value={formValues.caption}
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    label="Description"
                                    type="text"
                                    name="description"
                                    value={formValues.description}
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    label="Image"
                                    type="text"
                                    name="image"
                                    value={formValues.image}
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    label="History"
                                    type="text"
                                    name="history"
                                    value={formValues.history}
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    label="History Image"
                                    type="text"
                                    name="historyImage"
                                    value={formValues.historyImage}
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    label="Price"
                                    type="number"
                                    name="price"
                                    value={formValues.price}
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    label="Stock"
                                    type="number"
                                    name="stock"
                                    value={formValues.stock}
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    label="Tags"
                                    type="text"
                                    name="tags"
                                    value={formValues.tags}
                                    onChange={handleChange}
                                />
                                 <Form.Input
                                    label="Country"
                                    type="text"
                                    name="country"
                                    value={formValues.country}
                                    onChange={handleChange}
                                />
                                <Button type="submit">Save</Button>
                                <Button onClick={()=> setIsEditMode(false)}>Cancel</Button>

                            </Form>
                        )}
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Caption</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Image</Table.HeaderCell>
                                    <Table.HeaderCell>History</Table.HeaderCell>
                                    <Table.HeaderCell>History Image</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                    <Table.HeaderCell>Stock</Table.HeaderCell>
                                    <Table.HeaderCell>Tags</Table.HeaderCell>
                                    <Table.HeaderCell>Country</Table.HeaderCell>
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {products.map((product) => (
                                    <Table.Row key={product.id}>
                                        <Table.Cell>{product.name}</Table.Cell>
                                        <Table.Cell>{product.caption}</Table.Cell>                                       
                                        <Table.Cell>{product.description}</Table.Cell>
                                        <Table.Cell>{product.image}</Table.Cell>
                                        <Table.Cell>{product.history}</Table.Cell>
                                        <Table.Cell>{product.historyImage}</Table.Cell>
                                        <Table.Cell>{product.price}</Table.Cell>                                       
                                        <Table.Cell>{product.stock}</Table.Cell>
                                        <Table.Cell>{product.tags}</Table.Cell>
                                        <Table.Cell>{product.country}</Table.Cell>
                                        <Table.Cell>
                                            <Button.Group>
                                                <Button
                                                    onClick={() => editProduct(product)}
                                                    color="blue"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() => deleteProducts(product.id)}
                                                    color="red"
                                                >
                                                    Delete
                                                </Button>
                                            </Button.Group>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                )}
            </Container>
        </Container>);
}

export default observer(AdminPage);