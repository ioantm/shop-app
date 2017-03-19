import React from 'react';
import classNames from 'classnames';
import styles from '../bulma.sass';

function Input({ className, ...rest }) {
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
