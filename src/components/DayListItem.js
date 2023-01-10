import React from "react";
import classNames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(
  {
    name,
    spots,
    setDay,
    selected: isSelected,
    ...props
  }
) {
  const isFull = spots === 0 ? true : false;
  const classLibrary = {
    'day-list__item': true,
    'day-list__item--selected': isSelected,
    'day-list__item--full': isFull,
  }

  const classDayListItem = classNames(classLibrary)

  return (
    <li className={classDayListItem} onClick={() => setDay(name)}>
      <h2 className='text--regular'>{name}</h2>
      <h3 className='text--light'>{spots} spots remaining</h3>
    </li>
   );
}
