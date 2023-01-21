import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "components/DayListItem.scss";

const DayListItem = ({
	name, // String: state.days by reference
	setDay, // Function: callback to execute when a day is clicked
	selected: isSelected, // Boolean: if true, use class "day-list__item--selected"
	spots, // Number: total interview spots available for the day
	...props
}) => {
	const isFull = spots === 0 ? true : false;
	const classLibrary = {
		"day-list__item": true,
		"day-list__item--selected": isSelected,
		"day-list__item--full": isFull,
	};

	const classDayListItem = classNames(classLibrary);

	const formatSpots = (spots) => {
		const messages = {
			0: "no spots remaining",
			1: `${spots} spot remaining`,
		};

		return messages[spots] || `${spots} spots remaining`;
	};

	return (
		<li
			className={classDayListItem}
			onClick={() => setDay(name)}
			data-testid="day"
		>
			<h2 className="text--regular">{name}</h2>
			<h3 className="text--light">{formatSpots(spots)}</h3>
		</li>
	);
};

DayListItem.propTypes = {
	name: PropTypes.string.isRequired,
	setDay: PropTypes.func.isRequired,
	selected: PropTypes.bool.isRequired,
	spots: PropTypes.number.isRequired,
};

export default DayListItem;
