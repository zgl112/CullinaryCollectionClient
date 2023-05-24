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
import { ICreditCardFormValues } from '../../App/managementStore/checkoutStore';

const validate = combineValidators({
    cardnumber: isRequired("Card number"),
    cvc: isRequired("CVC")
})

 export const BillingForm : React.FC = () => {
    const navigate = useNavigate();
    const rootstore = useContext(RootStoreContext);
    const { setPayment } = rootstore.checkoutStore;
    return(
        <ReactForm
        onSubmit={async (form: ICreditCardFormValues) => {
          try {
            setPayment(form);
          } catch (error) {
            // Handle the error if necessary
             return { [FORM_ERROR]: error };
          }
        }}
        validate={validate}
        render={({handleSubmit,submitting,submitError,invalid,pristine, dirtySinceLastSubmit})=> 
        (
            <Form onSubmit={handleSubmit} error>
            <Header as="h2" content="Payment Information" textAlign="center" color="black" />
            <Field name="cardnumber" component={TextInput} placeholder="Card number" />
            <Field name="cardIssuer" component={TextInput} placeholder="Card issuer" />
            <Field name="cvc" component={TextInput} placeholder="CVC" />
            <Field name="expDate" component={TextInput} placeholder="Expiry date" />
      
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
