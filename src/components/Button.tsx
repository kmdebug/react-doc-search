import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  title: string;
};
const Button: React.FC<Props> = ({
  children,
  className = '',
  onClick,
  disabled = false,
  title,
}): JSX.Element => {
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;
