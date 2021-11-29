import { styled } from '@mui/material/styles';
import { Card, CardMedia, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export const MovieCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: calc(calc(100% / 3) - 1em);
  margin: 1em 0.5em;

  ${({ theme }) => theme.breakpoints.down('xl')} {
    width: calc(50% - 4em);
    margin: 1em 2em;
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: calc(50% - 1em);
    margin: 1em 0.5em;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: calc(100% - 1em);
    margin: 1em 4em;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
    margin: 1em 0;
  }
`;

export const MovieCardMedia = styled(CardMedia)`
  height: 400px;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('xl')} {
    height: 500px;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    height: 600px;
  }
`;

export const MovieCardTitle = styled(Typography)`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: auto;
  padding: 10px;
  padding-bottom: 0;
`;

export const MovieCardInfos = styled('div')`
  align-items: center;
  display: flex;
  justify-content: space-between;
  justify-self: flex-end;
  padding: 10px;
`;

export const MovieCardPill = styled('p')`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 12px;
  padding: 0 10px;
`;

export const MovieAddCircleIcon = styled(AddCircleIcon)`
  color: ${({ theme }) => theme.palette.success.main};
  cursor: pointer;
  height: 30px;
  width: 30px;
`;

export const MovieRemoveCircleIcon = styled(RemoveCircleIcon)`
  color: ${({ theme }) => theme.palette.error.main};
  cursor: pointer;
  height: 30px;
  width: 30px;
`;
