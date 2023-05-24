import { ICart } from '../Models/user';
import { RootStore } from './rootStore';
import { observable, action, computed, makeObservable, runInAction, reaction } from "mobx";

export default class CartStore {
    rootStore: RootStore;
    cart: ICart[] = [];
  
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.cart= [];
        this.addToCart = this.addToCart.bind(this);
        makeObservable(this, {
          cart: observable,
          addToCart: action,
          removeFromCart: action,
          updateCartItem: action,
          clearCart: action,
        });
      }

    
      

    addToCart = (item: ICart): void =>{
        if(this.cart.length < 0){
            this.cart!.push({ ...item, items: 1 });   
            console.log("added 1.")
        }else{
        const existingItem = this.cart!.find((cartItem) => cartItem.id === item.id);
        console.log('1');
        if (existingItem) {
          // If the item already exists in the cart, increment its quantity
          existingItem.items += 1;
        } else {
          // If the item doesn't exist in the cart, add it with quantity 1
          runInAction(() => {
            this.cart!.push({ ...item, items: 1 });   
               });
          console.log(this.cart!);
        }
        }
      }

      removeFromCart = (item: ICart): void =>{
        const existingItemIndex = this.cart!.findIndex((cartItem) => cartItem.id === item.id);
    
        if (existingItemIndex !== -1) {
          const existingItem = this.cart![existingItemIndex];
          if (existingItem.items > 1) {
            // If the item quantity is greater than 1, decrement its quantity
            existingItem.items -= 1;
          } else {
            runInAction(() => {
                this.cart!.splice(existingItemIndex, 1);
            })
          }
        }
      }

    updateCartItem = (updatedItem: ICart): void => {
        if (this.cart) {
            const itemIndex = this.cart.findIndex((item) => item.id === updatedItem.id);
            if (itemIndex !== -1) {
                this.cart[itemIndex] = updatedItem;
            }
        }
    };

    clearCart = (): void => {
        this.cart = [];
    };

    get calculateTotal(): number {
        if (!this.cart) return 0;
    
        let total = 0;
        this.cart.forEach((item) => {
          total += item.items * item.price;
        });
        return total;
      }

      get calculateNumbers(): number {
        if (!this.cart) return 0;
    
        let total = 0;
        this.cart.forEach((item) => {
          total += item.items;
        });
        return total;
      }
}


