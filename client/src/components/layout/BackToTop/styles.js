import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  backToTop: {
    zIndex: 2,
    position: 'fixed',
    bottom: '2vh',
    backgroundColor: '#DCDCDC',
    width: '2em',
    height: '2em',
    color: 'black',
    '&:hover, &.Mui-focusVisible': {
      transition: '0.3s',
      color: '#397BA6',
      backgroundColor: '#DCDCDC',
    },
    right: '5%',
  },
  [theme.breakpoints.down('sm')]: {
    backToTop: {
      right: '50%',
      left: '50%',
      marginLeft: '-1em',
    },
  },
}));
