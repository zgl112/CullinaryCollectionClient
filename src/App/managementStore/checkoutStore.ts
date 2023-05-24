import { RootStore } from "./rootStore";
import { observable, action, makeObservable, runInAction } from "mobx";


export interface IFormAddressValues {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postcode: string;
}
export interface ICreditCardFormValues {
    cardnumber: string;
    cardIssuer: string;
    cvc: string;
    expDate: string;
}

export default class CheckoutStore {
    rootStore: RootStore;
    
    addressForm: IFormAddressValues = {
        addressLine1: "",
        addressLine2: "",
        city: "",
        postcode: "",
    }
    paymentForm: ICreditCardFormValues = {
        cardnumber: "",
        cardIssuer: "",
        cvc: "",
        expDate: "",
    }

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.addressForm ={
            addressLine1: "",
            addressLine2: "",
            city: "",
            postcode: ""
        }
        this.paymentForm={
            cardnumber: "",
            cardIssuer: "",
            cvc: "",
            expDate: ""
        }


        makeObservable(this, {
            addressForm: observable,
            paymentForm: observable,
            setAddress: action,
            setPayment: action
        });
    }

    setAddress = ( addressForm: IFormAddressValues ): void => {
        runInAction(()=> this.addressForm = addressForm);
    }

    setPayment = (paymentForm: ICreditCardFormValues): void => {
        runInAction(()=> this.paymentForm = paymentForm);
    }
    

}