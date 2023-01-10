import React from "react";
import classNames from 'classnames';
import "components/InterviewerListItem.scss";

export default function InterviewerListItem (
  {
    id,
    name,
    avatar,
    selected: isSelected,
    setInterviewer,
    ...props
  }
) {
  const classLibrary = {
    li: {
      'interviewers__item': true,
      'interviewers__item--selected': isSelected,
    },

    img: {
      'interviewers__item-image': true,
    }
  }

  const classLi = classNames(classLibrary.li);
  const classImg = classNames(classLibrary.img);

  
  return (
    <li className={ classLi } onClick={ setInterviewer }>
      <img
        className={ classImg }
        src={ avatar }
        alt={ name }
      />
      { isSelected && name }
    </li>
  );
}