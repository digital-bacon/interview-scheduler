import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import React from "react";

export default function Form({
  student,
  interviewers,
  interviewer,
  onSave,
  onCancel,
  ...props
}) {
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
              your code goes here
            */
          />
        </form>
        <InterviewerList
          interviewers={ interviewers }
          interviewer={ interviewer }
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={ onCancel }>Cancel</Button>
          <Button confirm onClick={ onSave }>Save</Button>
        </section>
      </section>
    </main>
  );
}
