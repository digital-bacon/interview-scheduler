import React from "react";
import DayListItem from "./DayListItem.jsx";

export default function DayList({ days: daysArray, day: currentDayName, setDay, ...props }) {
  const days = daysArray.map(day => {
    return (
      <DayListItem
        key={ day.id }
        name={ day.name }
        spots={ day.spots }
        selected={ day.name === currentDayName }
        setDay={ setDay }
      />
    )
  })

  return (
    <ul>
      { days }
    </ul>
   );
}
