import React from "react";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem ({ id, name, avatar, selected: isSelected, setInterviewer, ...props } = props) {
  return (
    <li className="interviewers__item" onClick={ () => setInterviewer(id) }>
      <img
        className="interviewers__item-image"
        src={ avatar }
        alt={ name }
      />
      { name }
    </li>
  );
}