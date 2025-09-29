import React, { FC, JSX, MouseEvent } from 'react';
import styles from './button.module.scss';

interface IProps {
  label?: string;
  disabled?: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const Button: FC<IProps> = ({
  label = 'Ok',
  disabled = false,
  onClick
}: IProps): JSX.Element => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!disabled && typeof onClick === 'function') {
      onClick(event);
    }
  };

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
