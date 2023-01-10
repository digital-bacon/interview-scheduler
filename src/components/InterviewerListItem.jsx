import React from "react";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem ({ id, name, avatar, selected: isSelected, ...props } = props) {
  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}