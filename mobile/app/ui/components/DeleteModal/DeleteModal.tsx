import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import ModalContainer from "../ModalContainer/ModalContainer";

import { deleteModalStyle } from "./DeleteModal.styles";
import { DeleteModalProps } from "./DeleteModal.types";

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  setIsOpen,
  movie,
  deleteReview,
}) => {
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} large={true}>
      <Text style={deleteModalStyle.modalTitle}>Delete review</Text>
      <Text style={deleteModalStyle.modalText}>
        Are you sure you want to delete {movie?.title} review?
      </Text>
      <View style={deleteModalStyle.buttonsContainer}>
        <Button
          mode="contained"
          style={deleteModalStyle.button}
          color="#FE6D8E"
          onPress={() => deleteReview()}
        >
          Delete
        </Button>
        <Button
          mode="contained"
          style={deleteModalStyle.button}
          color="#A1A1A1"
          onPress={() => setIsOpen(false)}
        >
          Cancel
        </Button>
      </View>
    </ModalContainer>
  );
};

export default DeleteModal;
