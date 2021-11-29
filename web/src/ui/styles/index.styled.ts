import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

export const MainContainer = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const SubContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;
