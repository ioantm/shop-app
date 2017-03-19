import React from 'react';

type IconProps = {
    icon: string,
    size: number,
    color: string
}

const Icon = (props: IconProps) => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    path: {
      fill: props.color,
    },
  };

  return (
    <svg
      style={styles.svg}
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox="0 0 1024 1024"
    >
      <path
        style={styles.path}
        d={props.icon}
      ></path>
    </svg>
  );
};

Icon.defaultProps = {
  size: 16,
};

export default Icon;
export {default as Icons} from './icons';
