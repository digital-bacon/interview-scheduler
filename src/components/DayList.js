import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days.map(day => {
    return (
      <DayListItem
        id={day.id}
        name={day.name}
        spots={day.spots}
        setDay={day.setDay}
      />
    )
  })

  return (
    <ul>
      {days}
    </ul>
   );
}
