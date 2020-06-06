import React from 'react';
import PropTypes from 'prop-types';

// MUI stuff
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

export const CustomButton = ({ children, onClick, tip, btnClassName, tipClassName }) => (
  <Tooltip title={tip} className={tipClassName} placement="top">
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);

CustomButton.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func,
  btnClassName: PropTypes.string,
  tipClassName: PropTypes.string,
  tip: PropTypes.string
};
