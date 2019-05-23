import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactOutsideHandle from 'react-outside-handle';
import classNames from 'classnames';

import './style.scss';

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
      searchText: '',
      spanWidth: 0,
    };
  }

  handleToggleShow() {
    const { showOptions } = this.state;
    if (!showOptions && this.input) {
      this.input.focus();
    }
    this.setState({ showOptions: !showOptions });
  }

  handleInputChange(e) {
    const {
      onSearch,
    } = this.props;
    const { value } = e.target;
    this.setState({ searchText: value }, () => {
      this.setState({ spanWidth: this.textSpan.offsetWidth });
    });
    onSearch(value);
  }

  handleSelectedItemClick(item) {
    const {
      value, onChange,
    } = this.props;
    const { key } = item;
    const pos = value.findIndex(e => e.key === key);
    if (pos >= 0) {
      value.splice(pos, 1);
    }
    onChange(value);
  }

  handleUnselectedItemClick(item) {
    const {
      value, onChange,
    } = this.props;
    const { key } = item;
    if (value.find(e => e.key === key)) {
      return;
    }
    value.push(item);
    onChange(value);
  }

  handleSelectAll() {
    const {
      value, options, onChange,
    } = this.props;
    if (value.length < options.length) {
      onChange(options);
      return;
    }
    onChange([]);
  }

  render() {
    const {
      disabled, value, options, onSearch, width, showSelectAll,
    } = this.props;
    const unselectedOptions = [];
    options.map((item) => {
      if (value.find(e => e.key === item.key)) {
        return;
      }
      unselectedOptions.push(item);
    });
    const { showOptions, searchText, spanWidth } = this.state;
    return (
      <div className={classNames({ 'multi-select': true, open: showOptions, disabled })} style={width ? { width } : {}}>
        <ReactOutsideHandle
          handleClick={() => { this.setState({ showOptions: false }); }}
        >
          <i onClick={() => this.handleToggleShow()} />
          <div className="multi-select_value" onClick={() => this.handleToggleShow()}>
            {onSearch && <input ref={(ref) => { this.input = ref; }} autoComplete="off" style={spanWidth ? { width: spanWidth } : {}} onChange={e => this.handleInputChange(e)} />}
            {onSearch && (
              <span ref={(ref) => { this.textSpan = ref; }}>
                {searchText}
              </span>
            )}
            {value && value.length > 0 && value.map(item => (
              <div className="multi-select_value-item" key={item.key}>
                <span title={item.label}>
                  {item.label}
                </span>
                <i onClick={() => this.handleSelectedItemClick(item)} />
              </div>
            ))}
          </div>
          {showOptions && options && options.length > 0 && (
            <div className="multi-select_options">
              {value && value.length > 0 && (
              <div className="multi-select_options-selected">
                {value && value.length > 0 && value.map(item => (
                  <div className="multi-select_value-item" key={item.key}>
                    <span title={item.label}>
                      {item.label}
                    </span>
                    <i onClick={() => this.handleSelectedItemClick(item)} />
                  </div>
                ))}
              </div>
              )
              }
              {showSelectAll && (
                <div className="multi-select_options-select-all" onClick={() => this.handleSelectAll()}>
                  {value.length < options.length ? '全选' : '取消全选'}
                </div>
              )}
              <div className="multi-select_options-unselected">
                {unselectedOptions && unselectedOptions.length > 0 && unselectedOptions.map(item => (
                  <div
                    className="multi-select_options-unselected-item"
                    key={item.key}
                    onClick={() => this.handleUnselectedItemClick(item)}
                  >
                    <span title={item.label}>{item.label}</span>
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

MultiSelect.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  width: PropTypes.number,
  showSelectAll: PropTypes.bool,
};

MultiSelect.defaultProps = {
  disabled: false,
  value: [],
  options: [],
  onSearch: null,
  width: null,
  showSelectAll: false,
};

export default MultiSelect;
