export function getAppointmentsForDay(state, day) {
  let appointments = []
  let appointmentsForDay = []
  for(let x of state.days){
    if (x.name === day){
      appointments=[...x.appointments]
    }
  }
  for(let x of appointments){
    appointmentsForDay.push(state.appointments[x])
  }
  return appointmentsForDay
}

export function getInterviewsForDay(state, day) {
  let interviewersId = []
  let interviewersForDay = []
  for(let x of state.days){
    if (x.name === day){
      interviewersId=[...x.interviewers]
    }
  }
  for(let x of interviewersId){
    interviewersForDay.push(state.interviewers[x])
  }
  return interviewersForDay
}

export function getInterview(state, boy) {
  const interview = boy;
  if(interview){
    for(let i in state.interviewers){
      if(interview.interviewer === state.interviewers[i].id){
        const interviewer = state.interviewers[i]
        return {...interview, interviewer: interviewer}
      } 
    }
    return null
  }else {
    return null
  }
}

export function getSpotsForDays(state) {
  let appointments = []
  let spot = {};
  let count = 0;
  for(let x of state.days){
    if (x.name){
      appointments=[...x.appointments]
    }
  }
  for(let x of appointments){
    if(appointments.interview){
      count++
    }
  }
  return count
}
