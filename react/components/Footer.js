import React from 'react';
import FilterLink from '../containers/FilterLink';

const Footer = () => (
  <p className='footer'>
    Show:
    {" "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_BUSY">
      Busy
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_SOLVED">
      Solved
    </FilterLink>
  </p>
);

export default Footer;
