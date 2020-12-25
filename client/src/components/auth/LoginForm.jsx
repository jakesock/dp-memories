import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

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

  const error = useSelector((state) => {
    return state.error;
  });
  const prevError = usePrevious(error);

  const classes = useStyles();
  const dispatch = useDispatch();

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

    const { username, password } = formData;
    const user = {
      username,
      password,
    };

    dispatch(clearErrors());
    dispatch(login(user));
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeForm = () => {
    setForm('register');
    dispatch(clearErrors());
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Login</Typography>
        <Typography variant="h6">{errorMsg}</Typography>
        <TextField
          name="username"
          variant="outlined"
          label="Username"
          fullWidth
          value={formData.username}
          onChange={onChange}
        />
        <TextField
          name="password"
          type="password"
          variant="outlined"
          label="Password"
          fullWidth
          value={formData.password}
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
          Login
        </Button>
      </form>
      <span>
        Don't have an account?{' '}
        <button type="button" onClick={changeForm}>
          Register
        </button>
      </span>
    </Paper>
  );
};

export default LoginForm;
