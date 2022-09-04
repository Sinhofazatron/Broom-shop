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
      // disableBodyScroll(modalRootElement);
      modalRootElement.appendChild(element);
      document.body.style.overflowY = "hidden";
      // document.body.style.paddingRight = "7px";

      return () => {
        // clearAllBodyScrollLocks();
        modalRootElement.removeChild(element);
      };
    } else {
      // enableBodyScroll(modalRootElement);
      document.body.style.overflowY = "scroll";
      // document.body.style.paddingRight = "0";
    }
  }, [props.open]);

  if (props.open) {
    return createPortal(
      <div className={styles.modal_background} onClick={props.onClose}>
        <div className={styles.modal_card} onClick={(e) => e.stopPropagation()}>
          <button onClick={props.onClose} className="popup__close-btn">
            <svg
              className="popup__close-btn-img"
              width="17px"
              height="17px"
              viewBox="0 0 17 17"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
              >
                <g
                  id="24-px-Icons"
                  transform="translate(-364.000000, -124.000000)"
                  stroke="#000000"
                >
                  <g
                    id="ic_cancel"
                    transform="translate(360.000000, 120.000000)"
                  >
                    <g
                      transform="translate(5.000000, 5.000000)"
                      strokeWidth="2"
                    >
                      <path d="M0,0 L14.1421356,14.1421356" id="Line"></path>
                      <path d="M14,0 L1.77635684e-15,14" id="Line"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>
          {props.children}
        </div>
      </div>,
      element
    );
  }
  return null;
}

export default Modal;
