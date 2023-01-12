import React, { useEffect, useState } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";

// const appointmentData = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

const Application = (props) => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = day => setState(prev => ({...prev, day}));
  // const setDays = days => setState(prev => ({...prev, days}));
  // const setAppointments = appointments => setState({...prev, appointments});

  const onEdit = () => console.log('onEdit triggered');
  const onDelete = () => console.log('onDelete triggered');

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments'))
    ])
    .then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      setState(prev => ({ ...prev, days, appointments }));
    })
    .catch(error => console.log(error.message));
  }, []);

  // const appointmentArray = Object.values(appointmentData);
  const dailyAppointments = [];
  const appointments = dailyAppointments.map(appointment => {
    return (
      <Appointment
        key={ appointment.id }
        onEdit={ onEdit }
        onDelete={ onDelete }
        { ...appointment }
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
        days={ state.days }
        value={ state.day }
        onChange={ setDay }
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        { appointments }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

export default Application;