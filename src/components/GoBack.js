import React from 'react';

export default props => {
  return (
    <a onClick={props.handleBackClick} href={null} className="navbar-link">
      {'<<'} back to search
    </a>
  );
};
