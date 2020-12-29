import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper } from '@material-ui/core';

import FormFooter from './layout/FormFooter/FormFooter';
import FormHeader from './layout/FormHeader/FormHeader';
import FormInput from './layout/FormInput';

import { register } from '../../actions/auth';
import { clearErrors } from '../../actions/error';

import usePrevious from '../../hooks/usePrevious';
import useStyles from './styles';

const RegisterForm = ({ setForm }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordCheck: '',
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const error = useSelector((state) => {
    return state.error;
  });
  const prevError = usePrevious(error);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (error !== prevError) {
      if (error.id === 'REGISTER_FAIL') {
        setErrorMsg(error.msg.msg);
      } else {
        setErrorMsg(null);
      }
    }
  }, [error, prevError]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password, passwordCheck } = formData;
    const newUser = {
      username,
      password,
      passwordCheck,
    };

    dispatch(clearErrors());
    dispatch(register(newUser));
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeForm = () => {
    setForm('login');
    dispatch(clearErrors());
  };

  return (
    <Paper className={`${classes.paper} ${classes.stickyForm}`}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <FormHeader title="Register" errorMsg={errorMsg} />
        <FormInput
          label="Username"
          name="username"
          id="username"
          inputType="text"
          formData={formData}
          onChange={onChange}
        />
        <FormInput
          label="Password"
          name="password"
          id="password"
          inputType="password"
          formData={formData}
          onChange={onChange}
        />
        <FormInput
          label="Confirm Password"
          name="passwordCheck"
          id="passwordCheck"
          inputType="password"
          formData={formData}
          onChange={onChange}
        />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Register
        </Button>
      </form>
      <FormFooter type="register" changeForm={changeForm} />
    </Paper>
  );
};

export default RegisterForm;
