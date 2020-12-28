import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const FormInput = ({ label, name, id, inputType, formData, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

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
            fullWidth
          />
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
            fullWidth
          />
        );
    }
  };

  return <>{inputToRender()}</>;
};

export default FormInput;
