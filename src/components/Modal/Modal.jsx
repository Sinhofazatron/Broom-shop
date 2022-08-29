import styles from "./Modal.module.scss";
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

const modalRootElement = document.querySelector("#modal");

function Modal(props) {
  const element = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    if (props.open) {
      disableBodyScroll(modalRootElement);
      modalRootElement.appendChild(element);
      // document.body.style.overflow = "hidden";
      return () => {
        clearAllBodyScrollLocks();
        modalRootElement.removeChild(element);
      };
    } else {
      enableBodyScroll(modalRootElement);
      // document.body.style.overflow = "visible";
    }
  }, [props.open]);

  if (props.open) {
    return createPortal(
      <div className={styles.modal_background} onClick={props.onClose}>
        <div className={styles.modal_card} onClick={(e) => e.stopPropagation()}>
          {props.children}
        </div>
      </div>,
      element
    );
  }
  return null;
}

export default Modal;
