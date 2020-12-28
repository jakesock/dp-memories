import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import useStyles from './styles';

const BackToTop = ({ showBelow }) => {
  const [show, setShow] = useState(showBelow ? false : true);

  const classes = useStyles();

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  });

  const handleClick = () => {
    window['scrollTo']({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {show && (
        <IconButton onClick={handleClick} className={classes.backToTop}>
          <ExpandLessIcon />
        </IconButton>
      )}
    </div>
  );
};

export default BackToTop;
