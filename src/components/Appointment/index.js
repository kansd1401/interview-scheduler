import React,{ Fragment, useEffect } from "react";
import Header from "./header"
import Empty from "./empty"
import Show from "./show";
import Confirm from "./confirm";
import Status from "./status";
import Error from "./error";
import Form from "./form";
import useVisualMode from "../hooks/useVisualMode";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id,interview)
      .then(() => {
        transition(SHOW)
        props.updateSpots(false)
      })
      .catch(()=> transition(ERROR_SAVE,true))
  }

  function cancel() {
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
        props.updateSpots(true)
      })
      .catch(()=> transition(ERROR_DELETE,true))
  }

  return (
    <article className="appointment"><Header time={props.time} />
    {mode === CREATE && <Form 
                save={save}
                id = {props.id} 
                onSave = {() => transition(SAVING,true)}
                interviewers={props.interviewers} 
                onCancel={() => back()}/>}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete = {() => transition(CONFIRM)}
        onEdit = {() => transition(EDIT)}
      />
    )}
    {mode === SAVING && (
      <Status
        message = "Saving"
      />
    )}
    {mode === DELETING && (
      <Status
        message = "Deleting"
      />  
    )}
    {mode === CONFIRM && (
      <Confirm
        message = "Are you sure you wanna delete your appointment"
        onCancel={() => back()}
        onConfirm={cancel}
        onSave = {() => transition(DELETING,true)}
      />
    )}
    {mode === EDIT && <Form 
                save={save}
                id = {props.id}
                onSave = {() => transition(SAVING,true)}
                interviewers={props.interviewers}
                name={props.interview.student}
                interviewer = {props.interview.interviewer.id}
                onCancel={() => back()}
                />}
    {mode === ERROR_SAVE && (
      <Error 
          message = {"Could not save the appointment."}
          onClose = {() => back()}/>
    )}

    {mode === ERROR_DELETE && (
      <Error 
          message = {"Could not cancel the appointment."}
          onClose = {() => back()}/>
    )}
    </article>
  );
}