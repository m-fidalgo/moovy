import React from "react";
import { Portal, Modal } from "react-native-paper";

import { modalStyle } from "./ModalContainer.styles";
import { ModalContainerProps } from "./ModalContainer.types";

const ModalContainer: React.FC<ModalContainerProps> = ({
  isOpen,
  setIsOpen,
  large,
  children,
}) => {
  return (
    <Portal>
      <Modal
        visible={isOpen}
        onDismiss={() => setIsOpen(false)}
        style={large ? modalStyle.modalLarge : modalStyle.modalSmall}
      >
        {children}
      </Modal>
    </Portal>
  );
};

export default ModalContainer;
