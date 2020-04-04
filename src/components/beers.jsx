import React, { Component } from "react";
import Beer from "./beer";
import BeerDetails from "./beer-details";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { displayBeer } from "../actions/beerActions";

import Modal from "react-bootstrap4-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Beers extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      beer: {}
    };
  }

  // render beer list
  renderBeers() {
    if (this.props.beers.length === 0)
      return (
        <div className="col my-5 text-center">
          <FontAwesomeIcon className="beer-icon" icon="beer" size="5x" />
        </div>
      );

    return this.props.beers.map(beer => (
      <Beer key={beer.id} beer={beer} onDetail={this.displayDetails} />
    ));
  }

  // display beer details
  displayDetails = beer => {
    this.props.displayBeer(beer); // dispatch selection action
    this.openModal(); // open modal
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row row-eq-height py-5">{this.renderBeers()}</div>
        </div>

        <Modal
          visible={this.state.modalIsOpen}
          onClickBackdrop={this.closeModal}
          className="bd-example-modal-lg"
          dialogClassName="modal-lg"
        >
          {this.state.modalIsOpen && !this.props.isLoading && (
            <BeerDetails beer={this.props.selected} onClose={this.closeModal} />
          )}
        </Modal>
      </>
    );
  }
}

Beers.propTypes = {
  displayBeer: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
};

const mapStateToProps = state => ({
  selected: state.beer.selected,
  isLoading: state.isLoading
});

export default connect(
  mapStateToProps,
  { displayBeer }
)(Beers);
