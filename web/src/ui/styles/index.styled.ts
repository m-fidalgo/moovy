import { styled } from '@mui/material/styles';

export const MainContainer = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
`;
