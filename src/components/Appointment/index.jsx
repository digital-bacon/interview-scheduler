import React from "react";
import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import 'components/Appointment/styles.scss';

const CREATE = "CREATE";
const EMPTY = "EMPTY";
const SHOW = "SHOW";

const Appointment = ({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  ...props
}) => {
  const student = interview?.student;
  const interviewer = interview?.interviewer.name;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    bookInterview(name, interviewer);
    const interview = {
      student: name,
      interviewer
    };
    console.log('interview= ', interview)
    // transition(SHOW);  
  }

  
  const onEdit = () => console.log('onEdit triggered');

  const onDelete = () => console.log('onDelete triggered');

  return (
    <article className="appointment">
      <Header time={ time }/>
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
      { mode === SHOW && (
        <Show
          student={ student }
          interviewer={ interviewer }
          onEdit={ onEdit }
          onDelete={ onDelete }
        />
      ) }
      { mode === CREATE && (
        <Form
          student={ student }
          interviewer={ interviewer }
          interviewers={ interviewers }
          onSave={ save }
          onCancel={ back }
        />
      ) }
    </article>
  );
}

export default Appointment;