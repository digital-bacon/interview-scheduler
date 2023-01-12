import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import 'components/Appointment/styles.scss';

const Appointment = ({
  id,
  time,
  interview,
  onEdit,
  onDelete,
  ...props
}) => {
  const student = interview?.student;
  const interviewer = interview?.interviewer.name;

  return (
    <article className="appointment">
      <Header time={ time }/>
      { interview ?
        <Show
          student={ student }
          interviewer={ interviewer }
          onEdit={ onEdit }
          onDelete={ onDelete }
        /> :
        <Empty/>
      }
    </article>
  );
}

export default Appointment;