import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

function Spinner({ height }) {
  return (
    <div className="spinner" style={{ height }}>
      <div className="spinner-loading" />
    </div>
  );
}

Spinner.propTypes = {
  height: PropTypes.number,
};

Spinner.defaultProps = {
  height: 500,
};

export default Spinner;
