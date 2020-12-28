import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root, & .MuiFormControl-root': {
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
  userInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(1),
    marginBottom: 0,
    padding: theme.spacing(0),
  },
  buttonLogout: {
    textTransform: 'none',
  },
  [theme.breakpoints.up('md')]: {
    stickyForm: {
      position: 'sticky',
      top: 24,
    },
  },
}));
