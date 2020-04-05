import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBeers, fetchMoreBeers } from "../actions/beerActions";

import Search from "./search";
import Beers from "./beers";

class Home extends Component {
  componentWillMount() {
    // load beers if none are found in state
    if (this.props.beers && this.props.beers.length === 0)
      this.props.fetchBeers(this.props.page);
  }

  componentDidMount() {
    // add scroll listener when component mounts
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    // remove scroll listener when component is unmounting
    window.removeEventListener("scroll", this.onScroll, false);
  }

  onScroll = () => {
    // exit function if beers are currently being loaded
    if (this.props.isLoading) return;

    // check if scroll is at the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 20
    ) {
      // load more beers and append to state
      this.props.fetchMoreBeers(this.props.page);
    }
  };

  render() {
    return (
      <>
        <header className="justify-content-center py-2 bg-warning text-center text-white">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="font-weight-bold">The Beer Bank ver: 0.2.4 with nginx auto build tag</h1>
                <p>Find your favourite beer here</p>
              </div>
            </div>
            <Search />
          </div>
        </header>
        <Beers beers={this.props.beers} />
      </>
    );
  }
}

// redux stuff
Home.propTypes = {
  fetchBeers: PropTypes.func.isRequired,
  fetchMoreBeers: PropTypes.func.isRequired,
  beers: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  beers: state.beer.beers,
  page: state.beer.page,
  isLoading: state.beer.isLoading
});

export default connect(
  mapStateToProps,
  { fetchBeers, fetchMoreBeers }
)(Home);
