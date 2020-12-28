import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  formHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(1),
    marginBottom: 0,
  },
  formError: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));
