import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  backToTop: {
    zIndex: 2,
    position: 'fixed',
    bottom: '2vh',
    backgroundColor: '#DCDCDC',
    width: '1em',
    height: '1em',
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
      width: '50px',
      height: '50px',
      right: '50%',
      left: '50%',
      marginLeft: '-25px',
    },
  },
}));
