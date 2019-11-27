import React from "react";
import Header from "./header"
import Empty from "./empty"
import "./styles.scss";


export default function Appointment(props) {
  return (
    <article className="appointment"><Header time={props.time} /></article>
  );
}