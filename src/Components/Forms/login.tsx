import React, { useContext } from 'react';
import {Form as ReactForm, Field } from "react-final-form";
import { Button, Form, Header } from 'semantic-ui-react';
import {combineValidators,isRequired} from 'revalidate';
import { FORM_ERROR } from 'final-form';
import { ILogin } from '../../App/Models/user';
import ErrorMessage from './error';
import TextInput from './textInput';
import { RootStoreContext } from '../../App/managementStore/rootStore';
import { useNavigate } from 'react-router-dom';

const validate = combineValidators({
  email: isRequired("Email"),
  password: isRequired("Password")
})

 export const LoginForm : React.FC = () => {
    const navigate = useNavigate();
    const rootstore = useContext(RootStoreContext);
    const { login } = rootstore.userStore;
    

    return(
        <ReactForm
        onSubmit={async (form: ILogin) => {
          try {
            await login(form);
            navigate("/shop");
          } catch (error) {
            // Handle the error if necessary
            return { [FORM_ERROR]: error };
          }
        }}
        validate={validate}
        render={({handleSubmit,submitting,submitError,invalid,pristine, dirtySinceLastSubmit})=> 
        (
          <Form onSubmit={handleSubmit} error>
            <Header as="h2"content="Login"textAlign="center" color="black" />
            <Field name="email" component={TextInput} placeholder="E-mail" />
            <Field name="password" component={TextInput} placeholder="Password" type="password"
            />
            {submitError && !dirtySinceLastSubmit && (
              <ErrorMessage error={submitError} text="Invalid e-mail or password!"/>)
            }
            <Button
              disabled={(invalid && !dirtySinceLastSubmit) || pristine}loading={submitting}content="Login" fluid color="grey" />
          </Form>
          
        )}
      />
    );
}
