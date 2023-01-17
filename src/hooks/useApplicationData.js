import { useEffect, useState } from "react";

import axios from 'axios';

import selectors from '../helpers/selectors';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({...prev, day}));

  const calculateNewSpots = (action = '', dayIndex = -1) => {
    const currentSpots = state.days[dayIndex]?.spots || 0;
    if (action === 'create interview' && currentSpots > 0) {
      return currentSpots > 0 ? currentSpots - 1 : currentSpots;
    }

    if (action === 'delete interview') {
      return currentSpots + 1;
    }

    return currentSpots;
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayIndex = selectors.getDayIndexByDayName(state, state.day);
    const newSpots = calculateNewSpots('create interview', dayIndex);
    const days = [...state.days];
    days[dayIndex].spots = newSpots;

    return axios.put(`/api/appointments/${id}`, { ...appointment })
      .then(response => {
        setState({ ...state, days: [ ...days ], appointments: { ...appointments }});
        return response;
      }
    )
  }

  const cancelInterview = (id) => {
    const appointments = { ...state.appointments }
    appointments[id].interview = null;

    const dayIndex = selectors.getDayIndexByDayName(state, state.day);
    const newSpots = calculateNewSpots('delete interview', dayIndex);
    const days = [...state.days];
    days[dayIndex].spots = newSpots;
    
    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState(prev => ({ ...prev, appointments }));
        return response;
      }
    )
  }

  useEffect(() => {
    const apis = {
      days: 'api/days',
      appointments: 'api/appointments',
      interviewers: 'api/interviewers'
    };

    Promise.all([
      Promise.resolve(axios.get(apis.days)),
      Promise.resolve(axios.get(apis.appointments)),
      Promise.resolve(axios.get(apis.interviewers))
    ])
    .then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    })
    .catch(error => console.log(error.message));
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
   };
};

export default useApplicationData;