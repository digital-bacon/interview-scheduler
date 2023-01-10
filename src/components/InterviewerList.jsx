import React from "react";
import "components/InterviewerList.scss";

export default function InterviewerList ({ interviewers, ...props }) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}