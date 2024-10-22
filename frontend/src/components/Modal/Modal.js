import { useEffect, useRef } from "react";

import "./Modal.scss";
const Modal = ({ openModal, closeModal, children }) => {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog className="modal" ref={ref} onCancel={closeModal}>
      {children}
    </dialog>
  );
};
export default Modal;
