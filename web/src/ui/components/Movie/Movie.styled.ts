import { styled } from '@mui/material/styles';
import { Card, CardMedia, Typography } from '@mui/material';

export const MovieCard = styled(Card)`
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

export const MovieCardContent = styled('div')`
  padding: 10px;
`;

export const MovieCardTitle = styled(Typography)`
  font-size: 15px;
  font-weight: bold;
`;

export const MovieCardInfos = styled('div')`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;

export const MovieCardPill = styled('p')`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 12px;
  padding: 0 10px;
`;
