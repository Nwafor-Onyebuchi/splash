import React from "react";
import { Modal } from "react-bootstrap";

const ImageModal = ({ imgUrl, closeModal, show }) => {
  return (
    <Modal centered show={show} onHide={closeModal}>
      <Modal.Body>
        <img
          className="img-responsive"
          style={{ width: "100%" }}
          src={imgUrl}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
