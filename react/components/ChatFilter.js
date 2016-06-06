import React from 'react';
import FilterLink from '../containers/FilterLink';

const ChatFilter = () => (
  <div className='state-filter'>
    <FilterLink filter="SHOW_ALL">
      <div className='state-filter-single all' title='all'></div>
    </FilterLink>
    <FilterLink filter="SHOW_ACTIVE">
      <div className='state-filter-single active' title='active'></div>
    </FilterLink>
    <FilterLink filter="SHOW_BUSY">
      <div className='state-filter-single busy' title='busy'></div>
    </FilterLink>
    <FilterLink filter="SHOW_ENGAGED">
    <div className='state-filter-single engaged' title='engaged'></div>
    </FilterLink>
    <FilterLink filter="SHOW_SOLVED">
      <div className='state-filter-single solved' title='solved'></div>
    </FilterLink>
  </div>
);

export default ChatFilter;
