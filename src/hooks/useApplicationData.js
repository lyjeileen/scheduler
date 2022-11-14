import { useEffect, useReducer } from 'react';
import axios from 'axios';

export default function useApplicationData(initial) {
  //define action type
  const SET_DAY = 'SET_DAY';
  const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
  const SET_INTERVIEW = 'SET_INTERVIEW';

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.value.days,
          appointments: action.value.appointments,
          interviewers: action.value.interviewers,
        };

      case SET_INTERVIEW: {
        return {
          ...state,
          appointments: action.value.appointments,
          days: action.value.days ? action.value.days : state.days,
        };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviews: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

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
    const days = updateSpots(id);

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) =>
      dispatch({
        type: SET_INTERVIEW,
        value: {
          appointments: {
            ...state.appointments,
            //change the appointment info with this id
            [id]: {
              ...state.appointments[id],
              interview: { ...interview },
            },
          },
          //change remaining spots if it's a new appointment
          ...(!state.appointments[id].interview ? { days } : {}),
        },
      })
    );
  }

  function cancelInterview(id) {
    //create new appointments data without deleted interview info
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    const days = updateSpots(id, false);

    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) =>
        dispatch({ type: SET_INTERVIEW, value: { appointments, days } })
      );
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        },
      });
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
