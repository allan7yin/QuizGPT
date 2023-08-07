import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import "../Styles/ErrorModal.css";

const ErrorModal = ({ errorMessage, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(errorMessage !== "");
  }, [errorMessage]);

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 500); // 500ms delay
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      className="error-modal"
      overlayClassName="error-modal-overlay"
      ariaHideApp={false}
    >
      <div className="error-message">{errorMessage}</div>
      <button onClick={handleCloseModal}>OK</button>
    </Modal>
  );
};

export default ErrorModal;
