import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  formFooter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  formFooterBtn: {
    textTransform: 'none',
    padding: 0,
    margin: 0,
    '&:hover': {
      background: 'transparent',
      textDecoration: 'underline',
    },
  },
}));
