import { Typography } from '@mui/material';
import { styled } from '@mui/system';

export const ErrorContainerStyled = styled('div')`
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  align-items: center;
`;

export const ErrorImg = styled('img')`
  height: 200px;
`;

export const ErrorTypography = styled(Typography)`
  text-align: center;
  font-size: 20px;
  color: ${({ theme }) => theme.palette.secondary.main};
  margin-top: 10px;
`;
