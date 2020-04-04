import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleFavourite } from "../actions/beerActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Beer extends Component {
  // check if beer is in favourites array
  isFavourite = () => {
    return this.props.favourites.indexOf(this.props.beer) !== -1;
  };

  // toggle beer favourite status
  handleFavourite = e => {
    e.stopPropagation();
    this.props.handleFavourite(this.props.beer);
  };

  // handle detail event on beer click
  handleDetail = () => {
    this.props.onDetail(this.props.beer);
  };

  render() {
    return (
      <div
        className="beer-item col-12 col-sm-6 col-md-4 p-3 text-center"
        key={this.props.beer.id}
        onClick={this.handleDetail}
      >
        <div className="details bg-white p-3">
          <div className="row">
            <div className="col-12">
              <button
                className={
                  "btn btn-link btn-fav float-right " +
                  (this.isFavourite() ? "active" : "")
                }
                onClick={this.handleFavourite}
              >
                <FontAwesomeIcon icon="star" />
              </button>
            </div>
          </div>

          <div className="row my-1">
            <div className="col">
              <img
                src={this.props.beer.image_url}
                alt={this.props.beer.name}
                className="beer-thumbnail"
              />
            </div>
          </div>
          <h5 className="text-warning font-weight-bold">
            {this.props.beer.name}
          </h5>
          <p className="text-muted">{this.props.beer.tagline}</p>
        </div>
      </div>
    );
  }
}

// redux stuff
Beer.propTypes = {
  favourites: PropTypes.array.isRequired,
  handleFavourite: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  favourites: state.beer.favourites
});

export default connect(
  mapStateToProps,
  { handleFavourite }
)(Beer);
