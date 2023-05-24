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
import { IFormAddressValues } from '../../App/managementStore/checkoutStore';

const validate = combineValidators({
    addressLine1: isRequired("Address Line 1"),
    postcode: isRequired("Postcode")
})

 export const AddressForm : React.FC = () => {
    const navigate = useNavigate();
    const rootstore = useContext(RootStoreContext);
    const { setAddress } = rootstore.checkoutStore;
    

    return(
        <ReactForm
        onSubmit={async (form: IFormAddressValues) => {
          try {
           setAddress(form);
          } catch (error) {
            // Handle the error if necessary
             return { [FORM_ERROR]: error };
          }
        }}
        validate={validate}
        render={({handleSubmit,submitting,submitError,invalid,pristine, dirtySinceLastSubmit})=> 
        (
            <Form onSubmit={handleSubmit} error>
            <Header as="h2" content="Address" textAlign="center" color="black" />
            <Field name="addressLine1" component={TextInput} placeholder="Address Line 1" />
            <Field name="addressLine2" component={TextInput} placeholder="Address Line 2" />
            <Field name="city" component={TextInput} placeholder="City" />
            <Field name="postcode" component={TextInput} placeholder="Postcode" />
      
            {submitError && !dirtySinceLastSubmit && (
              <ErrorMessage error={submitError} text="Invalid e-mail or password!" />
            )}
      
            <Button
              disabled={(invalid && !dirtySinceLastSubmit) || pristine}
              loading={submitting}
              content="Save"
              fluid
              color="grey"
            />
          </Form>
          
        )}
      />
    );
}
