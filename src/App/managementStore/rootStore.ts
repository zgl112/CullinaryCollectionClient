import {configure, makeObservable, reaction} from 'mobx';
import {createContext} from 'react';
import { UserStore } from './userStore';
import { ProductStore } from './productStore';
import ModalStore from './modalStore';
import CartStore from './cartStore';
import CheckoutStore from './checkoutStore';

configure({enforceActions: "always"});

//rootConstructor to inject all other state management required for this app

export class RootStore {
    userStore : UserStore;
    productStore: ProductStore;
    modalStore: ModalStore;
    cartStore: CartStore;
    checkoutStore: CheckoutStore;
    constructor(){
        this.userStore = new UserStore(this);
        this.productStore = new ProductStore(this);
        this.modalStore = new ModalStore(this);
        this.cartStore = new CartStore(this);
        this.checkoutStore = new CheckoutStore(this);
    }
}
export const RootStoreContext = createContext(new RootStore());