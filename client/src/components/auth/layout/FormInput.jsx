import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Button } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import useStyles from './styles';

const FormInput = ({
  label,
  name,
  id,
  inputType,
  formData,
  onChange,
  error = null,
  helperText = null,
  currentPost = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputToRender = () => {
    switch (inputType) {
      case 'password':
        return (
          <TextField
            label={label}
            id={id}
            name={name}
            type={showPassword ? 'text' : 'password'}
            value={formData[name]}
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            {...(error && { error: true, helperText: error })}
            {...(!error && helperText ? { helperText: helperText } : null)}
            fullWidth
          />
        );
      case 'file':
        return (
          <Button
            className={classes.buttonChooseImage}
            variant="contained"
            component="label"
            color="default"
            endIcon={<AddAPhotoIcon />}
            disableElevation
          >
            Choose {currentPost ? 'New' : 'An'} Image
            <input
              type="file"
              name={name}
              id={id}
              onChange={onChange}
              hidden
            ></input>
          </Button>
        );
      case 'text':
      default:
        return (
          <TextField
            label={label}
            id={id}
            name={name}
            type={inputType}
            value={formData[name]}
            onChange={onChange}
            variant="outlined"
            {...(error && { error: true, helperText: error })}
            {...(!error && helperText ? { helperText: helperText } : null)}
            fullWidth
          />
        );
    }
  };

  return <>{inputToRender()}</>;
};

export default FormInput;
