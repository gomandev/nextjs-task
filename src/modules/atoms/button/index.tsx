import clsx from 'clsx';
import { FC, ReactChild } from 'react';

export interface ButtonProps {
  onClick?: (e: any) => void;
  children: ReactChild;
  type?: 'button' | 'submit' | 'reset';
  fill?: boolean;
  outline?: boolean;
  width?: string;
}

// const ButtonMapper: Record<ButtonVariant, string> = {
//   'fill-primary':
//     'text-main-white bg-ui-purple  hover:bg-transparent  border border-2 border-ui-purple  hover:text-ui-purple',
//   'outlined-primary':
//     'text-ui-purple bg-transparent  hover:bg-ui-purple border border-2 border-ui-purple hover:text-main-white  ',
//   'fill-secondary':
//     'text-main-white bg-main-red  hover:bg-transparent border border-2 border-main-red  hover:text-main-red',
//   'outlined-secondary':
//     'text-main-red bg-transparent  hover:bg-main-red  border-2 border-main-red hover:text-main-white ',
//   'fill-accent':
//     'text-main-white bg-main-blue hover:bg-transparent border border-2 border-main-blue  hover:text-main-blue',
//   'outlined-accent':
//     'text-main-blue bg-transparent  hover:bg-main-blue border border-2 border-main-blue hover:text-main-white ',
// };

export const Button: FC<ButtonProps> = ({
  onClick,
  fill,
  children,
  type = 'button',
  outline,
  width,
}) => (
  <button
    type={type}
    data-testid="main-button-cp"
    onClick={onClick}
    className={clsx(
      'but',
      outline
        ? 'text-main-black bg-transparent border-2 border-main-black'
        : 'text-main-white bg-black ',
    )}
    style={{
      backgroundColor: `${outline ? '' : '#000'}`,
      fontSize: '1.5rem',
      width: `${width ? `${width}px` : ''}`,
    }}
  >
    {children}
  </button>
);
