import axios from "axios";
import  { useEffect, useReducer } from "react";

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


function reducer(state, action) {
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


export default function useApplicationdata(props) {
  const [state, dispatch] = useReducer(reducer, SET_INTIAL);
  function bookInterview(id, interview) {
    const appointment = {
    ...state.appointments[id],  
    interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    dispatch({type: SET_INTERVIEW, value: appointments}) 
    return axios.put(`/api/appointments/${id}`, appointment)
  }

  function cancelInterview(id) {
    const appointment = {
    ...state.appointments[id],
    interview: null
    };
    return axios.delete(`/api/appointments/${id}`, appointment)
  }

  function updateSpots(action){
    let dayID;
    for(let x of state.days){
      if(state.day === x.name){
        dayID = x.id - 1
      }
    }
    const days = [...state.days]
    if(action){
      days[dayID].spots++
    }else {
      days[dayID].spots--
    }
    dispatch({type: SET_SPOTS, value: days})  
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA , value: [all[0].data,all[1].data,all[2].data]})
    });
  },[state.day])

  return { state, setDay: (day) => dispatch({ type: SET_DAY, value: day}),bookInterview , cancelInterview, updateSpots }
}