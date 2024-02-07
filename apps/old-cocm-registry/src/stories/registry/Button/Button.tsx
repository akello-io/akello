import React from 'react';
import classNames from "classnames";

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'x-small' | 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames('btn',
          {'btn-primary': primary},
          {'btn-xs': size=="x-small"},
          {'btn-sm': size=="small"},
          {'btn-md': size=="medium"},
          {'btn-lg': size=="large"}
        )
      }

      {...props}
    >
      {label}
    </button>
  );
};
