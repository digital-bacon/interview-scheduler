import React from "react";
import DayListItem from "./DayListItem.jsx";

export default function DayList({ days: daysArray, setDay, ...props }) {
  const days = daysArray.map(day => {
    return (
      <DayListItem
        key={ day.id }
        name={ day.name }
        spots={ day.spots }
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
