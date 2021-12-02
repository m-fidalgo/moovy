import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View } from "react-native";

import ButtonIcon from "../ButtonIcon/ButtonIcon";
import ModalContainer from "../ModalContainer/ModalContainer";
import { audioModalStyle } from "./AudioModal.styles";
import { AudioModalProps } from "./AudioModal.types";

const AudioModal: React.FC<AudioModalProps> = ({
  isOpen,
  setIsOpen,
  isPermissionGranted,
  time,
  onStart,
  onStop,
  isRecording,
  duration,
}) => {
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} large={false}>
      {isPermissionGranted ? (
        <>
          <View style={audioModalStyle.timeContainer}>
            <Icon name="fiber-manual-record" size={30} color="#FE0000" />
            {isRecording ? (
              <Text style={audioModalStyle.recordingTime}>{time}</Text>
            ) : (
              <Text style={audioModalStyle.playingTime}>
                {time} / {duration}
              </Text>
            )}
          </View>
          <View style={audioModalStyle.buttonsContainer}>
            <ButtonIcon
              onPress={() => onStart()}
              name={isRecording ? "mic-none" : "play-arrow"}
              color="#000000"
              backgroundColor="#6CD3AE"
              size={30}
            />
            <ButtonIcon
              onPress={() => onStop()}
              name="stop"
              color="#000000"
              backgroundColor="#FE6D8E"
              size={30}
            />
          </View>
        </>
      ) : (
        <View>
          <Text style={audioModalStyle.modalErrorText}>
            Permissions not granted
          </Text>
        </View>
      )}
    </ModalContainer>
  );
};

export default AudioModal;
