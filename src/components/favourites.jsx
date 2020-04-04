import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Beers from "./beers";

class Favourites extends Component {
  render() {
    return (
      <>
        <header className="justify-content-center py-2 bg-warning text-center text-white">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="font-weight-bold">The Beer Bank</h1>
                <p>These are your favourite beers</p>
              </div>
            </div>
          </div>
        </header>

        <Beers beers={this.props.favourites} />
      </>
    );
  }
}

// redux stuff
Favourites.propTypes = {
  favourites: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  favourites: state.beer.favourites
});

export default connect(
  mapStateToProps,
  {}
)(Favourites);
