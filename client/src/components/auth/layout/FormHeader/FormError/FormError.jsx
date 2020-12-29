import React from 'react';
import { Alert } from '@material-ui/lab';

import useStyles from './styles';

const FormError = ({ errorMsg }) => {
  const classes = useStyles();

  return (
    <Alert className={classes.formError} severity="error">
      {errorMsg}
    </Alert>
  );
};

export default FormError;
