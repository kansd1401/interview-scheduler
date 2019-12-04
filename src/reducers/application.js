const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOTS = "SET_SPOTS";
const SET_INTIAL = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {},
};


export function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {...state, day: action.value}
    case SET_APPLICATION_DATA:
      return   { ...state, days: [...action.value[0]], appointments: {...action.value[1]},interviewers: {...action.value[2]}};
    case SET_INTERVIEW: {
      return {...state, appointments: action.value }
    }
    case SET_SPOTS: {
      return {...state, days: action.value }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export {SET_APPLICATION_DATA,SET_DAY,SET_INTERVIEW,SET_SPOTS,SET_INTIAL}