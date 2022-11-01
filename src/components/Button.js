import React from 'react';
import 'components/Button.scss';
import classNames from 'classnames';
export default function Button(props) {
  let buttonClass = 'button';
  if (props.confirm) {
    buttonClass += ' button--confirm';
  }
  if (props.danger) {
    buttonClass += ' button--danger';
  }

  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={buttonClass}
    >
      {props.children}
    </button>
  );
}
