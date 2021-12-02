import React from "react";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

import { buttonIconStyle } from "./ButtonIcon.styles";
import { ButtonIconProps } from "./ButtonIcon.types";

const ButtonIcon: React.FC<ButtonIconProps> = ({
  backgroundColor,
  circle,
  color,
  name,
  onPress,
  size,
}) => {
  return (
    <Button
      mode="contained"
      color={backgroundColor}
      onPress={() => onPress()}
      style={circle ? buttonIconStyle.buttonCircle : buttonIconStyle.button}
    >
      <Icon name={name} size={size} color={color} />
    </Button>
  );
};

export default ButtonIcon;
