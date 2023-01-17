import React, { useState } from 'react';

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

const Form = ({
  student: studentName,
  interviewers,
  interviewer: interviewerId,
  onSave,
  onCancel,
  ...props
}) => {
  const [student, setStudentName] = useState(studentName || "");
  const [interviewer, setInterviewer] = useState(interviewerId || null);
  const onStudentNameInput = (event) => setStudentName(event.target.value);
  
  const reset = () => {
    setStudentName('');
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    onCancel();
  }

  const handleSubmit = (event) => event.preventDefault();

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={ handleSubmit }>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={ student }
            onChange={onStudentNameInput}
          />
        </form>
        <InterviewerList
          interviewers={ interviewers }
          value={ interviewer }
          onChange={ setInterviewer }
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={ cancel }>Cancel</Button>
          <Button confirm onClick={ () => onSave(student, interviewer) }>Save</Button>
        </section>
      </section>
    </main>
  );
}

export default Form;