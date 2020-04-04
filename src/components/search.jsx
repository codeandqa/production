import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchBeers, fetchBeers } from "../actions/beerActions";

class Search extends Component {
  componentWillMount() {
    // create timeout prop, set to null
    this.timeout = null;
  }

  onSearch = e => {
    // get input string from event obj
    let keyword = e.target.value;

    if (this.timeout) clearTimeout(this.timeout); // if timeout is not null, clear
    this.timeout = setTimeout(() => this.handleSearch(keyword), 500); // wait for user to stop typing then trigger search
  };

  handleSearch = keyword => {
    // if input is not empty, trigger search
    if (keyword.length !== 0) {
      this.props.searchBeers(keyword);
    } else {
      // if an empty string is searched, reload beer list
      this.props.fetchBeers();
    }
  };

  render() {
    return (
      <div className="row justify-content-center">
        <form className="col-md-6 col-sm-12">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for beer name"
              value={this.props.beerName}
              onInput={this.onSearch}
            />
          </div>
        </form>
      </div>
    );
  }
}

// redux stuff
Search.propTypes = {
  searchBeers: PropTypes.func.isRequired,
  fetchBeers: PropTypes.func.isRequired
};

export default connect(
  null,
  { searchBeers, fetchBeers }
)(Search);
