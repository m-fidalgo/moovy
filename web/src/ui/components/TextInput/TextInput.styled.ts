import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const TextInputStyled = styled(TextField)`
  width: 100%;
  margin-bottom: 30px;

  .MuiInputBase-root {
    background-color: white;
    height: 30px;
    width: 100%;
    border-radius: 30px;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;
