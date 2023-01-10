import React from "react";
import classNames from 'classnames';
import "components/Button.scss";

export default function Button(
  {
    onClick,
    disabled: isDisabled,
    confirm: isConfirm,
    danger: isDanger,
    ...props
  }
) {
  const classLibrary = {
    'button': true,
    'button--confirm': isConfirm,
    'button--danger': isDanger,
  }

  const buttonClass = classNames(classLibrary)

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={isDisabled}
    >
      {props.children}
    </button>
   );
}
