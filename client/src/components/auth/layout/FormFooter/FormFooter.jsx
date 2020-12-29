import React from 'react';
import { Typography, Button } from '@material-ui/core';

import useStyles from './styles';

const FormFooter = ({ type, changeForm }) => {
  const classes = useStyles();

  return (
    <div className={classes.formFooter}>
      <div>
        <Typography variant="body2" color="textSecondary">
          {type === 'login' ? "Don't have an account?" : 'Already have an account?'}
        </Typography>
      </div>
      <div>
        <Button
          variant="text"
          color="primary"
          className={classes.formFooterBtn}
          size="small"
          type="button"
          onClick={changeForm}
          disableElevation={true}
        >
          <Typography variant="body2" color="primary">
            {type === 'login' ? 'Register' : 'Login'}
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default FormFooter;
