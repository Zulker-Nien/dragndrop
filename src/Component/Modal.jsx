import { useContext } from "react";
import { observer } from "mobx-react-lite";
import Store from "../Store";
import "./modal.scss";
const Modal = () => {
  const store = useContext(Store);
  const { content, closeModal } = store;
  return (
    <div className="ModalContainer">
      <div className="ModalWrapper">
        <h1>{content}</h1>
        <div className="modalBody">
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default observer(Modal);
