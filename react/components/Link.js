import React, { PropTypes } from 'react';

const Link = ({ busy, children, onClick }) => {
  if (busy)
  return <span>{children}</span>

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
  busy: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link;
