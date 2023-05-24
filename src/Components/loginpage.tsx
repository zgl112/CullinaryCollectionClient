import React from 'react';
import { Container, Tab } from 'semantic-ui-react';
import Navbar from './navbar';
import { Footer } from './footer';
import { LoginForm } from './Forms/login';
import { RegistrationForm } from './Forms/signup';
const panes = [
    {
      menuItem: 'Log in',
      render: () => <Tab.Pane attached={false}><LoginForm/></Tab.Pane>,
    },
    {
      menuItem: 'Sign Up',
      render: () => <Tab.Pane attached={false}><RegistrationForm/></Tab.Pane>,
    }
]

export const LoginPage = () =>
    <Container className="homepage-base-container">
        <Navbar />
        <Container className="homepagelog-base-container">
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Container>
        <Footer />
    </Container>;