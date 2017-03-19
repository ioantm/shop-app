// @flow
import React from 'react';
import styles from './form.sass';

type FormFieldType = {
  children: ReactElement
}

export default ({ children }: FormFieldType) => (
  <div className={styles.field}>
    {children}
  </div>
);
