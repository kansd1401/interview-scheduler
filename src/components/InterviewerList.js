import React from "react";
import propTypes from "props-types";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props) {

  return (
    <ul>
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          {props.interviewers.map((person) => <InterviewerListItem 
            key={person.id}
            name={person.name} 
            avatar={person.avatar}
            id={person.id}
            selected={props.interviewer === person.id}
            setInterviewer={() => props.setInterviewer(person.id)}  />)}
        </ul>
      </section>
    </ul>
  );
}