export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(
    (interviewDay) => interviewDay.name === day
  );
  const filteredAppointments = [];

  if (filteredDays[0]) {
    filteredDays[0].appointments.forEach((appointment) => {
      filteredAppointments.push(state.appointments[appointment]);
    });
  }

  return filteredAppointments;
}

export function getInterview(state, interview) {
  if (interview) {
    const interviewObj = {};
    interviewObj.student = interview.student;
    const id = interview.interviewer;
    interviewObj.interviewer = state.interviewers[id];
    return interviewObj;
  }
  return null;
}
