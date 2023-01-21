import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "components/DayListItem.scss";

const DayListItem = ({
	name, // string.isRequired: day name
	setDay, // func.isRequired: onClick callback for <li>
	selected: isSelected, // bool.isRequired: if the day is selected
	spots, // number.isRequired: interview spots available for the day
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
