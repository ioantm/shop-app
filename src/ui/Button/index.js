// @flow
import React from 'react';
import classNames from 'classnames';
import styles from './button.sass';

type ButtonProps = {
  children: {},
  primary: boolean,
  className: string
};

console.log('styles', styles);

function Button({ children, primary, className, link, ...rest }: ButtonProps) {
  return (
    <a
      className={classNames(className, styles.button, {
        [styles['is-primary']]: primary,
        [styles['is-link']]: link
      })}
      {...rest}
    >
      {children}
    </a>
  );
}

export default Button;
