import React, { PropTypes } from 'react';

const Link = ({ active, children, onClick }) => {
  // TODO: ask how does this highlight the right filter?
  // if (active)
  // return <span>{children}</span>

  return (
    <a href='#'
      onClick={e => {
        e.preventDefault()
        onClick()
      }}>
      {children}
    </a>
  )
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link;
