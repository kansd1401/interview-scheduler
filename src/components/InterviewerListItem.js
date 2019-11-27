import React from "react";
import "components/InterviewerListItem.scss";
var classNames = require('classnames');


export default function InterviewerListItem(props) {
  const classes = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li  onClick={props.setInterviewer} className={classes}>
      <img
        className={"interviewers__item-image"}
        src={props.avatar}
        alt={props.name}
        
      />
      {props.selected && props.name}
    </li>
  );
}