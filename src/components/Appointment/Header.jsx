import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ time, ...props }) => {
  return (
    <header className='appointment__time'>
      <h4 className='text--semi-bold'>{ time }</h4>
      <hr className='appointment__separator' />
    </header>
  );
};

Header.propTypes = {
  time: PropTypes.string.isRequired,
};

export default Header;