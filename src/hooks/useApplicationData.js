import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviews: {},
  });

  const setDay = (day) => setState({ ...state, day });

  //calculate spots and generate a new "days" object. "decrease" is added to change +/-
  const updateSpots = (id, decrease = true) => {
    //use id to find the interview day object
    const interviewDay = state.days.find((day) =>
      day.appointments.includes(id)
    );

    const updatedDay = {
      ...interviewDay,
      spots: decrease ? interviewDay.spots - 1 : interviewDay.spots + 1,
    };

    const updatedDays = state.days.map((singleDay) => {
      if (singleDay.id === updatedDay.id) {
        return updatedDay;
      }
      return singleDay;
    });
    return updatedDays;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(id);

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => setState({ ...state, appointments, days }));
  }

  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    const days = updateSpots(id, false);

    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => setState({ ...state, appointments, days }));
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
