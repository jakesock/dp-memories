import React from 'react';
import { Container, Typography } from '@material-ui/core';

import FormError from './FormError';

import useStyles from './styles';

const FormHeader = ({ title, errorMsg }) => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.formHeader}>
        <Typography display="block" variant="h6">
          {title}
        </Typography>
        {errorMsg ? <FormError errorMsg={errorMsg} /> : null}
      </Container>
    </>
  );
};

export default FormHeader;
