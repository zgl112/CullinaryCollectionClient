import { ILogin, IRegister, IToken } from "../Models/user";
import { observable, reaction, action, runInAction, makeObservable } from "mobx";
import {  user } from "../API/apiagent";
import { RootStore } from "./rootStore";

export class UserStore {
  rootStore: RootStore;
  token: string | null = window.localStorage.getItem("jwt");
  appLoaded = false;
  isLoading = false;
  user: IRegister | null = JSON.parse(
    window.localStorage.getItem("user")!
  );

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      token: observable,
      appLoaded: observable,
      isLoading: observable,
      user: observable,
      setAppLoaded: action,
      setUser: action,
      login: action,
      signup: action,
      logout: action,
    });
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  setAppLoaded = () => {
    this.appLoaded = true;
  };

  setUser = (user: IRegister | null) => {
    this.user = user;
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }

  login = async (form: ILogin) => {
    try {
      localStorage.removeItem('user');
      this.isLoading = true;
      console.log("load form: " + form.email);
      const response: IToken = await user.login(form);
      const token = response.token;
      window.localStorage.setItem("jwt", token)
      console.log("token from login function: " + token.toString());
  
      runInAction(() => {
        this.token = token;
      });
  
      const encodedEmail = encodeURIComponent(form.email);
      const dbUser = await user.getUser(encodedEmail);
      console.log(form.email);
      runInAction(() => {
        this.setUser(dbUser);
        this.user = dbUser;
        console.log(this.user.name);
        this.isLoading = false;
      });
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  };
  
 signup = async (form: IRegister) => {
    try {
      console.log("load form: " + form.email);
      this.isLoading = true;
  
      const response: IToken = await user.register(form);
      const token = response.token;
      window.localStorage.setItem("jwt", token)
      runInAction(() => {
        this.token = token;
      });
  
      // Wait for the token to be set
      await new Promise<void>((resolve) => {
        reaction(
          () => this.token,
          (token) => {
            if (token) {
              resolve();
            }
          }
        );
      });
  
      const encodedEmail = encodeURIComponent(form.email);
      const dbUser = await user.getUser(encodedEmail);
      runInAction(() => {
        this.setUser(dbUser);
        this.user = dbUser;
        this.isLoading = false;
      });
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  };

  logout = async () => {
    try {
      this.token = null;
      this.user = null;
      sessionStorage.removeItem('user');
    } catch (error) {
      console.log(error);
    }
  }
}
