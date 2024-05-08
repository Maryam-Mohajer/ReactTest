import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { DropZone } from "../../../DropZone/DropZone";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  data?: any;
  isSingle?: boolean;
  name?: string;
  accept?: string;
  removeServedFiles?: () => void;
  inputText ?: any
}

const SelectModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  name,
  backdrop,
  data,
  accept,
  isSingle,
  removeServedFiles,
  inputText
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggleModal}>  {inputText ? inputText : "بارگزاری اسناد"} </ModalHeader>
        <ModalBody>
          <DropZone
            removeServedFiles={removeServedFiles}
            toggleModal={toggleModal}
            isSingle={isSingle}
            name={name ? name : "files"}
            accept={accept}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export { SelectModal };
