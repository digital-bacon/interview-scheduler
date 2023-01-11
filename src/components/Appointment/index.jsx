import React from "react";
import Header from "components/Appointment/Header.jsx";
import Empty from "components/Appointment/Empty.jsx";
import Show from "components/Appointment/Show.jsx";
import 'components/Appointment/styles.scss';

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

export default function Appointment({
  id,
  time,
  interview,
  onEdit,
  onDelete,
  ...props
}) {

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