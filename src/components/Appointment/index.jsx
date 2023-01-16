import React from "react";
import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import 'components/Appointment/styles.scss';

const CREATE = "CREATE";
const EMPTY = "EMPTY";
const SAVING = "SAVING";
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
  const initialMode = interview ? SHOW : EMPTY;
  const { mode, transition, back } = useVisualMode(initialMode);

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(error => console.log(error.message));
  }

  
  const onEdit = () => console.log('onEdit triggered');

  const onDelete = () => console.log('onDelete triggered');

  return (
    <article className="appointment">
      <Header time={ time }/>
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
      { mode === SAVING && <Status message={ 'Saving' } /> }
      { mode === SHOW && (
        <Show
          student={ student }
          interviewer={ interviewer }
          id={id}
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