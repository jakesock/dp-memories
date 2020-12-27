import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const PostDropdown = ({ handleEdit, handleDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditSelect = () => {
    handleEdit();
    handleClose();
  };

  const handleDeleteSelect = () => {
    handleDelete();
    handleClose();
  };

  return (
    <>
      <Button style={{ color: 'white' }} size="small" onClick={handleClick}>
        <MoreHorizIcon fontSize="default" />
      </Button>
      <Menu
        id="post-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleEditSelect}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteSelect}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default PostDropdown;
