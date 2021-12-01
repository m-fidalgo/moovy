import React from "react";
import { Portal, Modal } from "react-native-paper";
import { recordModalStyle } from "./RecordModal.styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { Text, View } from "react-native";

interface RecordModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  isPermissionGranted: boolean;
  recordingTime: string;
  onStartRecording: Function;
  onStopRecording: Function;
}

const RecordModal: React.FC<RecordModalProps> = (props) => {
  return (
    <Portal>
      <Modal
        visible={props.isOpen}
        onDismiss={() => props.setIsOpen(false)}
        style={recordModalStyle.modal}
      >
        {props.isPermissionGranted ? (
          <>
            <View style={recordModalStyle.recordingTimeContainer}>
              <Icon name="fiber-manual-record" size={30} color="#FE0000" />
              <Text style={recordModalStyle.recordingTime}>
                {props.recordingTime}
              </Text>
            </View>
            <View style={recordModalStyle.recordingButtonsContainer}>
              <ButtonIcon
                onPress={() => props.onStartRecording()}
                name="mic-none"
                color="#000000"
                backgroundColor="#6CD3AE"
                size={30}
              />
              <ButtonIcon
                onPress={() => props.onStopRecording()}
                name="stop"
                color="#000000"
                backgroundColor="#FE6D8E"
                size={30}
              />
            </View>
          </>
        ) : (
          <View>
            <Text style={recordModalStyle.modalErrorText}>
              Permissions not granted
            </Text>
          </View>
        )}
      </Modal>
    </Portal>
  );
};

export default RecordModal;
