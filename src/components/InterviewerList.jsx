import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList ({
  interviewers: interviewersArray,
  interviewer: currentInterviewerId,
  setInterviewer,
  ...props }) {

  const interviewers = interviewersArray.map(interviewer => {
    return (
        <InterviewerListItem
          key={ interviewer.id }
          name={ interviewer.name }
          avatar={ interviewer.avatar }
          selected={ currentInterviewerId === interviewer.id ? true : false }
          setInterviewer={ event => setInterviewer(interviewer.id) }
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