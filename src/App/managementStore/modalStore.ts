import { RootStore } from './rootStore';
import { observable, action, makeObservable } from "mobx";

export default class ModalStore {
    rootStore: RootStore;
    modal = {
      open: false,
      body: null
    };
  
    constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
  
      makeObservable(this, {
        modal: observable.shallow,
        openModal: action,
        closeModal: action,
      });
    }

 openModal = (content: any) => {
    this.modal.open = true;
    this.modal.body = content;
  };

  closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}
