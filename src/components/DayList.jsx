import React from 'react';
import PropTypes from 'prop-types';

import DayListItem from './DayListItem';

const DayList = ({
  days: daysArray,
  value,
  onChange,
  ...props
}) => {
  const days = daysArray.map(day => {
    return (
      <DayListItem
        key={ day.id }
        name={ day.name }
        spots={ day.spots }
        selected={ day.name === value }
        setDay={ onChange }
      />
    );
  });

  return (
    <ul>
      { days }
    </ul>
   );
};

DayList.propTypes = {
  days: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DayList;