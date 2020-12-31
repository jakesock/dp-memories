import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    height: '15em',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMsg: {
    marginBottom: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    stickyForm: {
      position: 'sticky',
      top: 30,
    },
  },
}));
