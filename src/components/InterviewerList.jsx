import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = ({
  interviewers: interviewersArray,
  interviewer: currentInterviewerId,
  onChange,
  ...props
}) => {
  const interviewers = interviewersArray.map(interviewer => {
    return (
        <InterviewerListItem
          key={ interviewer.id }
          name={ interviewer.name }
          avatar={ interviewer.avatar }
          selected={ currentInterviewerId === interviewer.id ? true : false }
          id={ interviewer.id }
          setInterviewer={ onChange }
        />
      );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        { interviewers }
      </ul>
    </section>
  );
}

export default InterviewerList;