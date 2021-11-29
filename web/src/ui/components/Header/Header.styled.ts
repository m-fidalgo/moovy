import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';

export const HeaderAppBar = styled(AppBar)`
  background-color: ${({ theme }) => theme.palette.background.default};
  box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.05);
  color: ${({ theme }) => theme.palette.primary.main};
  padding: 0 50px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 0;
  }
`;

export const HeaderToolbar = styled(Toolbar)`
  padding: 0 100px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 0 30px;
    justify-content: space-between;
  }
`;

export const HeaderLogo = styled('img')`
  margin-right: 100px;
`;

export const HeaderTypography = styled(Typography)`
  color: ${(props) =>
    props.className === 'selected'
      ? props.theme.palette.secondary.dark
      : 'inherit'};
  cursor: pointer;
  font-weight: bold;
  margin-right: 50px;
`;

export const HeaderDropdown = styled('div')`
  border-top: 3px solid rgba(0, 0, 0, 0.05);
  padding: 10px 30px;
`;
