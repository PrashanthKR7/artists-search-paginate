import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../styles/SearchBar.css';
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.search = React.createRef();
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.onUserInput(this.search.current.value);
    }
  };

  handleClick = () => {
    this.props.onUserInput(this.search.current.value);
  };

  render() {
    return (
      <div className="col-12 col-md-6 col-lg-4">
        <div className="card card-sm">
          <div className="row no-gutters align-items-center">
            <div className="col-auto">
              <i className="fas fa-search h4 text-body" />
            </div>
            <div className="col">
              <input
                className="form-control"
                ref={this.search}
                type="search"
                onKeyPress={this.handleKeyPress}
                placeholder={this.props.placeholder}
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-md btn-success"
                onClick={this.handleClick}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onUserInput: PropTypes.func.isRequired,
  filterText: PropTypes.string,
  placeholder: PropTypes.string
};

export default SearchBar;
