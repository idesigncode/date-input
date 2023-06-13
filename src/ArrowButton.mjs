import React from 'react';
import PropTypes from 'prop-types';
import { combineClassNames } from './helpers/combineClassNames.mjs';

const ArrowButton = ({
  children,
  className,
  direction,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      aria-hidden={disabled ? true : undefined}
      className={combineClassNames(['arrowButton', direction, className])}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <span>{children}</span>
    </button>
  );
};

ArrowButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['next', 'previous']).isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default ArrowButton;
