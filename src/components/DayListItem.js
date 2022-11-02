import React from 'react';
import './DayListItem.scss';
import classNames from 'classnames';

const formatSpots = (spots) => {
  if (spots > 1) {
    return `${spots} spots `;
  } else if (spots === 1) {
    return '1 spot ';
  } else return 'no spots ';
};

export default function DayListItem(props) {
  const dayClass = classNames({
    'day-list__item': !props.selected && props.spots,
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots,
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}remaining</h3>
    </li>
  );
}
