import React from "react";
import Header from "components/Appointment/Header.jsx";
import Empty from "components/Appointment/Empty.jsx";
import Show from "components/Appointment/Show.jsx";
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