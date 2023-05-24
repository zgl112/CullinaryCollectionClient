import  React, { useContext } from 'react';
import {Form as ReactForm, Field } from "react-final-form";
import { Button, Form, Header } from 'semantic-ui-react';
import { FORM_ERROR } from 'final-form';
import {combineValidators,isRequired} from 'revalidate';
import TextInput from './textInput';
import { IRegister } from '../../App/Models/user';
import ErrorMessage from './error';
import { RootStoreContext } from '../../App/managementStore/rootStore';

const validate = combineValidators({
  username: isRequired("Username"),
  email: isRequired("E-mail"),
  password: isRequired("Password")
})


export const RegistrationForm = () => {
    const rootstore = useContext(RootStoreContext);
    const { signup } = rootstore.userStore;
    return (
      <ReactForm
         onSubmit={(form: IRegister) => signup(form).catch(error => ({ [FORM_ERROR]: error }))}
        validate={validate}
        render={({handleSubmit,submitting, submitError,invalid, pristine,dirtySinceLastSubmit }) => 
        ( <Form onSubmit={handleSubmit} error>
            <Header as="h2"content="Sign Up" textAlign="center" color="black" />
            <Field name="name" component={TextInput} placeholder="Name" />
            <Field name="email" component={TextInput} placeholder="E-mail" />
            <Field name="password" component={TextInput} placeholder="Password" type="password"/>
            {submitError && !dirtySinceLastSubmit && (
              <ErrorMessage error={submitError} />
            )}
            <Button 
              loading={submitting} content="Create" fluid  color="grey"/>
          </Form>
        )}
      />
    );
  };