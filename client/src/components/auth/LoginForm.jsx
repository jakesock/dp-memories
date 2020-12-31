import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper } from '@material-ui/core';

import FormFooter from './layout/FormFooter/FormFooter';
import FormHeader from './layout/FormHeader/FormHeader';
import FormInput from './layout/FormInput';
import FormLoading from './layout/FormLoading/FormLoading';

import { login } from '../../actions/auth';
import { clearErrors } from '../../actions/error';

import usePrevious from '../../hooks/usePrevious';
import useStyles from './styles';

const LoginForm = ({ setForm }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [inputError, setInputError] = useState({});

  const isAsyncLoading = useSelector((state) => {
    return state.asyncLoading.formLoading;
  });
  const error = useSelector((state) => {
    return state.error;
  });
  const prevError = usePrevious(error);
  const prevFormData = usePrevious(formData);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (error !== prevError) {
      if (error.id === 'LOGIN_FAIL') {
        setErrorMsg(error.msg.msg);
      } else {
        setErrorMsg(null);
      }
    }
  }, [error, prevError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const { username, password } = formData;
      const user = {
        username,
        password,
      };
      if ((!errorMsg || prevFormData !== formData) && !isAsyncLoading) {
        dispatch(clearErrors());
        dispatch(login(user));
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validate({ [e.target.name]: e.target.value });
  };

  const validate = (fieldValues = formData) => {
    let temp = { ...inputError };
    if ('username' in fieldValues)
      temp.username = fieldValues.username ? '' : 'Username is required!';
    if ('password' in fieldValues)
      temp.password = fieldValues.password ? '' : 'Password is required!';

    setInputError({
      ...temp,
    });
    if (fieldValues === formData)
      return Object.values(temp).every((value) => value === '');
  };

  const changeForm = () => {
    setForm('register');
    dispatch(clearErrors());
  };

  return isAsyncLoading ? (
    <FormLoading />
  ) : (
    <Paper className={`${classes.paper} ${classes.stickyForm}`}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <FormHeader title="Login" errorMsg={errorMsg} />
        <FormInput
          label="Username"
          name="username"
          id="username"
          inputType="text"
          formData={formData}
          onChange={handleInputChange}
          error={inputError.username}
        />
        <FormInput
          label="Password"
          name="password"
          id="password"
          inputType="password"
          formData={formData}
          onChange={handleInputChange}
          error={inputError.password}
        />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Login
        </Button>
      </form>
      <FormFooter type="login" changeForm={changeForm} />
    </Paper>
  );
};

export default LoginForm;
