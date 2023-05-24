import { JSX, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootStoreContext } from "../App/managementStore/rootStore";
import { observer } from "mobx-react-lite";
import { Footer } from "./footer";
import { Button, Container, Divider, Grid, Header, Segment, Step } from "semantic-ui-react";
import Navbar from "./navbar";
import { AddressForm } from "./Forms/addressForm";
import { BillingForm } from "./Forms/billingForm";
import emailjs from '@emailjs/browser';
import useWindowDimensions from "./Utils/useDimensions";


const Checkout: React.FC = () => {
    const{width} = useWindowDimensions();

    const rootstore = useContext(RootStoreContext);
    const { calculateTotal, cart , clearCart} = rootstore.cartStore;
    const { addressForm, paymentForm } = rootstore.checkoutStore;
    const { user} = rootstore.userStore;
    const [orderSent, setOrderSent] = useState(false);

    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        { title: 'Shipping', description: 'Choose your shipping options' },
        { title: 'Billing', description: 'Enter billing information' },
        { title: 'Final Confirmation' },
        
    ];

    const handleStepClick = (index: number) => {
        setActiveStep(index);
    };

    const emailContent = `
  Thank you for your order!
  Order Summary:

  Products:
  ${cart.map((cartItem) => `  - ${cartItem.name}: ${cartItem.items} x £${cartItem.price} = £${cartItem.price * cartItem.items}`).join('\n')}

  Delivery Address:
  ${addressForm.addressLine1}
  ${addressForm.addressLine2}
  ${addressForm.city}
  ${addressForm.postcode}

  Payment Information:
  Card Number: ${paymentForm.cardnumber}
  Card Issuer: ${paymentForm.cardIssuer}
  CVC: ${paymentForm.cvc}
  Expiry Date: ${paymentForm.expDate}

  Total: £${calculateTotal}

  Thank you for shopping with us! We appreciate your business and look forward to welcoming you back in the future. If you have any questions or need further assistance, please don't hesitate to contact us.

  Best regards,
  Culinary Collection team
`;
  
const sendEmail = async () => {
    try {
      const result = await emailjs.send('service_tuvp8nr', 'template_smnq1o8', {
        to_email: user?.email,
        from_name: user?.name,
        message: emailContent
      }, 'TMIkFxescSm7Vftr6');
      setOrderSent(true);
      clearCart();
      console.log('Email sent successfully:', result.text);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

    return (
      width<360 ?  (<Container className="homepage-base-container">
            <Navbar />
            <Grid centered style={{ width: '100%', height: '70vh' }}>
                <Grid.Column mobile={16} tablet={8} computer={6} >
                    <Segment style={{ width: '110%', height: '60vh' }}>
                        <Step.Group ordered>
                            {steps.map((step, index) => (
                                <Step
                                    key={index}
                                    completed={index < activeStep}
                                    active={index === activeStep}
                                    onClick={() => handleStepClick(index)}
                                >
                                    <Step.Content>
                                        <Step.Title>{step.title}</Step.Title>
                                        {step.description && (
                                            <Step.Description>{step.description}</Step.Description>
                                        )}
                                    </Step.Content>
                                </Step>
                            ))}
                        </Step.Group>

                        <Segment style={{ width: '100%', height: '46vh' }}>
                            {activeStep === 0 && <AddressForm />}
                            {activeStep === 1 && <BillingForm />}
                            {activeStep === 2 &&
                                <Container>
                                    <Header style={{ marginTop: '5px' }} as='h2' textAlign='left'>Order Summary:</Header>
                                    <Grid divided='vertically'>
                                            <Grid.Column>
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
                                                    <Grid.Column width={5}></Grid.Column> {/* Empty column */}
                                                        <Grid.Column width={3}> 
                                                        <Link to="/checkout">
                                                        <Button fluid onClick={()=>
                                                        {sendEmail();
                                                        handleStepClick(3);}}>Order now</Button></Link></Grid.Column> {/* Empty column */}
                                                        <Grid.Column width={4}>{orderSent && <p>Order sent successfully!Order confirmation is on the way!</p>}</Grid.Column> {/* Empty column */}

                                                    </Grid.Row>
                                                </Grid>
                                            </Grid.Column>
                                        
                                    </Grid>
                                </Container>
                            } 
                        </Segment>
                    </Segment>
                </Grid.Column>
            </Grid>
            <Footer />
        </Container>):(<Container className="homepage-base-container">
            <Navbar />
            <Grid centered style={{ width: '100%', height: '70vh' }}>
                <Grid.Column mobile={16} tablet={8} computer={6} >
                    <Segment style={{ width: '110%', height: '100vh' }}>
                        <Step.Group ordered style={{marginLeft:'40px'}}>
                            {steps.map((step, index) => (
                                <Step
                                    key={index}
                                    completed={index < activeStep}
                                    active={index === activeStep}
                                    onClick={() => handleStepClick(index)}
                                >
                                    <Step.Content>
                                        <Step.Title>{step.title}</Step.Title>
                                        {step.description && (
                                            <Step.Description>{step.description}</Step.Description>
                                        )}
                                    </Step.Content>
                                </Step>
                            ))}
                        </Step.Group>

                        <Segment style={{ width: '100%', height: '56vh' }}>
                            {activeStep === 0 && <AddressForm />}
                            {activeStep === 1 && <BillingForm />}
                            {activeStep === 2 &&
                                <Container>
                                    <Header style={{ marginTop: '5px' }} as='h2' textAlign='left'>Order Summary:</Header>
                                    <Grid divided='vertically'>
                                            <Grid.Column>
                                                <Grid columns={16} >
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
                                                    <Grid.Column width={5}></Grid.Column> {/* Empty column */}
                                                        <Grid.Column width={3}> 
                                                        <Link to="/checkout">
                                                        <Button style={{marginTop:'100px'}} onClick={()=>
                                                        {sendEmail();
                                                        handleStepClick(3);}}>Order now</Button></Link></Grid.Column> {/* Empty column */}
                                                        <Grid.Column width={4}>{orderSent && <p>Order sent successfully!Order confirmation is on the way!</p>}</Grid.Column> {/* Empty column */}

                                                    </Grid.Row>
                                                </Grid>
                                            </Grid.Column>
                                        
                                    </Grid>
                                </Container>
                            } 
                        </Segment>
                    </Segment>
                </Grid.Column>
            </Grid>
        </Container>)

    );
}


export default observer(Checkout);
