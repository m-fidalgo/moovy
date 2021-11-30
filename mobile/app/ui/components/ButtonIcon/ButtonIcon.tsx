import React from "react";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { buttonIconStyle } from "./ButtonIcon.styles";

interface ButtonIconProps {
  name: string;
  onPress: Function;
  size: number;
  color: string;
  backgroundColor: string;
  circle?: boolean;
}

const ButtonIcon: React.FC<ButtonIconProps> = (props) => {
  return (
    <Button
      mode="contained"
      color={props.backgroundColor}
      onPress={() => props.onPress()}
      style={
        props.circle ? buttonIconStyle.buttonCircle : buttonIconStyle.button
      }
    >
      <Icon name={props.name} size={props.size} color={props.color} />
    </Button>
  );
};

export default ButtonIcon;
