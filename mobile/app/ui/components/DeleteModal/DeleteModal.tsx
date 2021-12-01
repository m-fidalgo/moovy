import React from "react";
import { Text, View } from "react-native";
import { Portal, Modal, Button } from "react-native-paper";
import { MovieInterface } from "../../../data/@types/MovieInterface";
import { deleteModalStyle } from "./DeleteModal.styles";

interface DeleteModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  movie?: MovieInterface;
  deleteReview: Function;
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  return (
    <Portal>
      <Modal
        visible={props.isOpen}
        onDismiss={() => props.setIsOpen(false)}
        style={deleteModalStyle.modal}
      >
        <Text style={deleteModalStyle.modalTitle}>Delete review</Text>
        <Text style={deleteModalStyle.modalText}>
          Are you sure you want to delete {props.movie?.title} review?
        </Text>
        <View style={deleteModalStyle.buttonsContainer}>
          <Button
            mode="contained"
            style={deleteModalStyle.button}
            color="#FE6D8E"
            onPress={() => props.deleteReview()}
          >
            Delete
          </Button>
          <Button
            mode="contained"
            style={deleteModalStyle.button}
            color="#A1A1A1"
            onPress={() => props.setIsOpen(false)}
          >
            Cancel
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default DeleteModal;
