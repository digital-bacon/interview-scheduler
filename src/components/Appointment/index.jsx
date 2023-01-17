import React from "react";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "components/Appointment/Confirm";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import 'components/Appointment/styles.scss';

const CONFIRM = "CONFIRM";
const CREATE = "CREATE";
const DELETING = "DELETING";
const EDIT = "EDIT";
const EMPTY = "EMPTY";
const SAVING = "SAVING";
const SHOW = "SHOW";

const Appointment = ({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview,
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

  // const edit = (name, interviewer) => {
  //   transition(SAVING);
  //   const interview = {
  //     student: name,
  //     interviewer
  //   };

  //   bookInterview(id, interview)
  //     .then(() => transition(SHOW))
  //     .catch(error => console.log(error.message));
  // }
  
  const onEdit = () => transition(EDIT);

  const onDelete = () => {
    transition(DELETING);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => console.log(error.message));
  }

  const onConfirm = () => transition(CONFIRM);

  return (
    <article className="appointment">
      <Header time={ time }/>
      { mode === DELETING && <Status message={ 'Deleting' } /> }
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
      { mode === CONFIRM && (
        <Confirm
          message={ `Delete appointment for ${student} with ${interviewer}?`}
          onConfirm={ onDelete }
          onCancel={ back }
        />
      ) }
      { mode === SAVING && <Status message={ 'Saving' } /> }
      { mode === SHOW && (
        <Show
          student={ student }
          interviewer={ interviewer }
          id={id}
          onEdit={ onEdit }
          onDelete={ onConfirm }
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
      { mode === EDIT && (
        <Form
          student={ student }
          interviewer={ interview?.interviewer?.id }
          interviewers={ interviewers }
          onSave={ save }
          onCancel={ back }
        />
      ) }
    </article>
  );
}

export default Appointment;