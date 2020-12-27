import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
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
