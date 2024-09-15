import { Fragment } from "react";
import ReactDOM from "react-dom";
import style from "./Modal.module.css";

const Overlay = function (props) {
  return <div className={`${style.overlay}`} onClick={props.onHideCart}></div>;
};

const ModalWindow = function (props) {
  return (
    <div className={`${style.modal}`}>
      <div className={`${style.content}`}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = function (props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Fragment>
          <Overlay onHideCart={props.onHideCart}></Overlay>
          <ModalWindow>{props.children}</ModalWindow>
        </Fragment>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
