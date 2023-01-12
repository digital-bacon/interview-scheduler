import React, { useEffect, useState } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import "components/Application.scss";

const Application = (props) => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = day => setState(prev => ({...prev, day}));

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

  const dailyAppointments = getAppointmentsForDay(state, state.day);
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