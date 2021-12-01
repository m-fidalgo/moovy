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
  time: string;
  onStart: Function;
  onStop: Function;
  isRecording: boolean;
  duration?: string;
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
            <View style={recordModalStyle.timeContainer}>
              <Icon name="fiber-manual-record" size={30} color="#FE0000" />
              {props.isRecording ? (
                <Text style={recordModalStyle.recordingTime}>{props.time}</Text>
              ) : (
                <Text style={recordModalStyle.playingTime}>
                  {props.time} / {props.duration}
                </Text>
              )}
            </View>
            <View style={recordModalStyle.buttonsContainer}>
              <ButtonIcon
                onPress={() => props.onStart()}
                name={props.isRecording ? "mic-none" : "play-arrow"}
                color="#000000"
                backgroundColor="#6CD3AE"
                size={30}
              />
              <ButtonIcon
                onPress={() => props.onStop()}
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
