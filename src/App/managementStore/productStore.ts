import { AxiosError } from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { IProducts } from "../Models/user";
import { products } from "../API/apiagent";

export class ProductStore {
  products: IProducts[] = [];
  product: IProducts | null = null;
  appLoaded: boolean = false;

  rootStore: RootStore;
  
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      products: observable,
      product: observable,
      appLoaded: observable,
      getProducts: action,
      getSingleProduct: action,
      addProduct: action,
      updateProduct: action,
      deleteProduct: action,
    });
  }

  getProducts = async (): Promise<IProducts[]> => {
  
    try {
      const list: IProducts[] = await products.getProducts();
      runInAction(() => {
        this.products = list;
        this.appLoaded = true;
      });
      return list; // Return the list of products
    } catch (error) {
      console.log(error);
      this.appLoaded = true;
      return []; // Return an empty array or handle the error case as needed
    }
  };

  getSingleProduct = async (id: string): Promise<IProducts> => {
    try {
      const list: IProducts[] = await products.getProducts();

      const productTemp = list.find((product: IProducts) => product.id === id);

      runInAction(() => {
        this.product = productTemp ?? null;
        this.appLoaded = true;
      });

      return Promise.resolve(this.product!);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
        // Handle error with response
      } else {
        console.log(error);
        // Handle other types of errors
      }

      return Promise.reject(error);
    }
  };

  addProduct = async (form: IProducts): Promise<IProducts> => {
    try {
      const product: IProducts = await products.add(form);
      runInAction(() => {
        this.products.push(product);
      });
      return product;
    } catch (error) {
      console.log(error);
      // Handle error
      return Promise.reject(error);
    }
  };

  updateProduct = async (id: string, form: IProducts): Promise<IProducts> => {
    try {
      const product: IProducts = await products.update(id, form);
      runInAction(() => {
        const index = this.products.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.products[index] = product;
        }
        if (this.product && this.product.id === id) {
          this.product = product;
        }
      });
      return product;
    } catch (error) {
      console.log(error);
      // Handle error
      return Promise.reject(error);
    }
  };

  deleteProduct = async (id: string): Promise<void> => {
    try {
      await products.delete(id);
      runInAction(() => {
        this.products = this.products.filter((product) => product.id !== id);
        if (this.product && this.product.id === id) {
          this.product = null;
        }
      });
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
}

