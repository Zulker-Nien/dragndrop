import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class Store {
  constructor() {
    makeAutoObservable(this);
  }
  modal = false
  content = ''
  dest= ''
  projectItem = ''

  setModal = () => {
    this.modal = true;
  };
  closeModal =() => {
      this.modal = false;
  }
  setContent = (content) => {
      this.content = content
  }
  sendMail = (dest,projectitem) => {
    this.dest = dest
    this.projectItem = projectitem
  }
}
export default createContext(new Store());
