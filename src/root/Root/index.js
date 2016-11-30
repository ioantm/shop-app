//@flow
import React from 'react';
import styles from './Root.css'

const Root = (props) => {
    return (
        <div className={styles.Root}>{props.children}</div>
    );
}

export default Root;