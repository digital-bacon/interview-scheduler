import React from "react";
import DayListItem from "./DayListItem.jsx";

export default function DayList({ days: daysArray, value, onChange, ...props }) {
  const days = daysArray.map(day => {
    return (
      <DayListItem
        key={ day.id }
        name={ day.name }
        spots={ day.spots }
        selected={ day.name === value }
        setDay={ onChange }
      />
    )
  })

  return (
    <ul>
      { days }
    </ul>
   );
}
