import React from "react";
import PropTypes from "prop-types";

import DayListItem from "./DayListItem";

const DayList = ({
	days: daysArray, // array.isRequired: list of days
	onChange, // func.isRequired: callback passed to <DayListItem>
	value, // string.isRequired: day name
	...props
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
