import React from "react";
import "components/DayListItem.scss";
var classNames = require('classnames');


export default function DayListItem(props) {
  const classes = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  return (
    <li data-testid = "day" onClick={props.setDay} className={classes}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots || "no"} {props.spots === 1 ? "spot":"spots"} remaining</h3>
    </li>
  );
}