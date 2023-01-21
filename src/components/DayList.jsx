import React from "react";
import PropTypes from "prop-types";

import DayListItem from "./DayListItem";

const DayList = ({
	days: daysArray, // Array: a copy of state.days
	onChange, // Function: callback to execute when a day is clicked
	value, // String: state.day value
	...props // Any: all other props not documented here
}) => {
	const days = daysArray.map((day) => {
		return (
			<DayListItem
				key={day.id}
				name={day.name}
				spots={day.spots}
				selected={day.name === value}
				setDay={onChange}
			/>
		);
	});

	return <ul>{days}</ul>;
};

DayList.propTypes = {
	days: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
};

export default DayList;
