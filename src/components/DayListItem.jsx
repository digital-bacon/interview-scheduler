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

  const classDayListItem = classNames(classLibrary);

  const formatSpots = () => {
    if (spots > 1) {
      return `${ spots } spots remaining`
    }

    if (spots === 1) {
      return `${ spots } spot remaining`
    }

    return 'no spots remaining';
  }

  return (
    <li className={ classDayListItem } onClick={ () => setDay(name) }>
      <h2 className='text--regular'>{ name }</h2>
      <h3 className='text--light'>{ formatSpots() }</h3>
    </li>
   );
}
