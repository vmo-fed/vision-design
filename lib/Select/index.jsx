import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactOutsideHandle from 'react-outside-handle';
import classNames from 'classnames';

import './style.scss';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
    };
  }

  handleToggleShow() {
    const { showOptions } = this.state;
    this.setState({ showOptions: !showOptions });
  }

  handleItemClick(item) {
    this.setState({ showOptions: false });
    const {
      onChange,
    } = this.props;
    onChange && onChange(item);
  }

  render() {
    const {
      disabled, value, options, width, className,
    } = this.props;
    const { showOptions } = this.state;
    const classNameMap = {};
    if (className && className.length) {
      className.split(' ').map((key) => {
        classNameMap[key] = true;
      });
    }
    return (
      <div
        className={classNames({
          dropdown: true, open: showOptions, disabled, ...classNameMap,
        })}
        style={width ? { width } : {}}
      >
        <ReactOutsideHandle
          handleClick={() => { this.setState({ showOptions: false }); }}
        >
          <i onClick={() => this.handleToggleShow()} />
          <div className="dropdown_value" onClick={() => this.handleToggleShow()}>
            {value && value.label}
          </div>
          {showOptions && options && options.length > 0 && (
            <div className="dropdown_options">
              <div className="dropdown_options-panel">
                {options && options.length > 0 && options.map(item => (
                  <div
                    key={item.value}
                    className={classNames({ 'dropdown_options-panel-item': true, active: value && item.value === value.value })}
                    onClick={() => this.handleItemClick(item)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </ReactOutsideHandle>
      </div>
    );
  }
}

Select.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.objectOf(),
  options: PropTypes.arrayOf(),
  onChange: PropTypes.func.isRequired,
  width: PropTypes.number,
  className: PropTypes.string,
};

Select.defaultProps = {
  disabled: false,
  value: null,
  options: [],
  width: null,
  className: '',
};

export default Select;
