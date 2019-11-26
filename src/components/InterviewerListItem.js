import React from "react";
import "components/InterviewerListItem.scss";
var classNames = require('classnames');


export default function InterviewerListItem(props) {
  const classes = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li onClick={() => props.setInterviwer(props.name)} className={classes}>
      <img
        className={classes}
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
}