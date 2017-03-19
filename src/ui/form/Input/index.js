// @flow
import React from 'react';
import classNames from 'classnames';
import styles from '../form.sass';

type PropsTypes = {
  className: string
};

function Input({ className, ...rest }: PropsTypes) {
  return (
    <div className={styles.control}>
      <input
        className={classNames(className, styles.input)}
        type="text"
        {...rest}
      />
    </div>
  );
}

export default Input;
