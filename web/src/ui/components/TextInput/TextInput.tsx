import React from 'react';
import { TextInputStyled } from './TextInput.styled';
import { TextFieldProps } from '@mui/material';

const TextInput: React.FC<TextFieldProps> = (props) => {
  return <TextInputStyled {...props} />;
};

export default TextInput;
