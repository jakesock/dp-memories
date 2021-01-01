import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper } from '@material-ui/core';

import FormFooter from './layout/FormFooter/FormFooter';
import FormHeader from './layout/FormHeader/FormHeader';
import FormInput from './layout/FormInput';
import FormLoading from './layout/FormLoading/FormLoading';

import { register } from '../../actions/auth';
import { clearErrors } from '../../actions/error';

import useUsernameSearch from '../../hooks/useUsernameSearch';
import usePrevious from '../../hooks/usePrevious';
import useStyles from './styles';

const RegisterForm = ({ setForm }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordCheck: '',
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [inputError, setInputError] = useState({});
  const [labels, setLabels] = useState({ username: 'Username' });
  const [helperText, setHelperText] = useState({ username: 'Max 16 Characters' });

  const isAsyncLoading = useSelector((state) => {
    return state.asyncLoading.formLoading;
  });
  const error = useSelector((state) => {
    return state.error;
  });

  const prevError = usePrevious(error);
  const prevFormData = usePrevious(formData);
  const { loading, usernameTaken } = useUsernameSearch(formData.username);

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

  useEffect(() => {
    if (usernameTaken && !loading) {
      setInputError((prevInputError) => ({
        ...prevInputError,
        username: 'Username taken!',
      }));
    } else if (usernameTaken === false && !loading) {
      setHelperText((prevHelperText) => ({
        ...prevHelperText,
        username: 'Looks good!',
      }));
    }
  }, [usernameTaken, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usernameTaken) {
      validate();
      setInputError((prevInputError) => ({
        ...prevInputError,
        username: 'Username taken!',
      }));

      return;
    }

    if (validate() && !usernameTaken) {
      const { username, password, passwordCheck } = formData;
      const newUser = {
        username,
        password,
        passwordCheck,
      };

      if ((!errorMsg || prevFormData !== formData) && !isAsyncLoading) {
        dispatch(clearErrors());
        dispatch(register(newUser));
      }
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
    validate({ [name]: value });

    if (name === 'username') {
      if (value.length > 0) {
        setLabels({ ...labels, username: `Username (${value.length}/16)` });
      } else {
        setLabels({ ...labels, username: 'Username' });
      }
    }
  };

  const validate = (fieldValues = formData) => {
    let temp = { ...inputError };
    if ('username' in fieldValues) {
      if (!fieldValues.username) {
        temp.username = 'Username is required!';
      } else if (fieldValues.username.length > 16) {
        temp.username = 'Username is too long! (Max 16 Characters)';
      } else {
        temp.username = '';
      }
    }

    if ('password' in fieldValues)
      temp.password = fieldValues.password ? '' : 'Password is required!';

    if ('passwordCheck' in fieldValues) {
      if (!fieldValues.passwordCheck) {
        temp.passwordCheck = 'Confirm password is required!';
      } else if (
        'password' in fieldValues &&
        fieldValues.passwordCheck !== fieldValues.password
      ) {
        temp.passwordCheck = 'Passwords do not match!';
      } else {
        temp.passwordCheck = '';
      }
    }

    setInputError({
      ...temp,
    });

    if (fieldValues === formData) {
      console.log(fieldValues.username);
      console.log(formData.username);
      return Object.values(temp).every((value) => value === '');
    }
  };

  const changeForm = () => {
    setForm('login');
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
        <FormHeader title="Register" errorMsg={errorMsg} />
        <FormInput
          label={labels.username}
          name="username"
          id="username"
          inputType="text"
          formData={formData}
          onChange={handleInputChange}
          error={inputError.username}
          helperText={helperText.username}
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
        <FormInput
          label="Confirm Password"
          name="passwordCheck"
          id="passwordCheck"
          inputType="password"
          formData={formData}
          onChange={handleInputChange}
          error={inputError.passwordCheck}
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
