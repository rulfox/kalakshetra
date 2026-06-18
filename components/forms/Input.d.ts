import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Uppercase tracked label above the field. */
  label?: React.ReactNode;
  /** Error message — turns the underline red and announces via role=alert. */
  error?: React.ReactNode | null;
  /** Success message — turns the underline green. */
  success?: React.ReactNode | null;
  /** "light" surface or "dark" (footer). Default "light". */
  tone?: 'light' | 'dark';
  containerStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}

/** Underline text input with gold focus + error/success states. */
export function Input(props: InputProps): JSX.Element;
