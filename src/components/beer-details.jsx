import React, { Component } from "react";

class BeerDetails extends Component {
  // render food pairing list
  renderFoodPairing = () => {
    return this.props.beer.food_pairing.map((item, key) => (
      <li key={key}>{item}</li>
    ));
  };

  // render similar beers
  renderSimilarBeers = () => {
    return this.props.beer.similar.map(beer => (
      <div className="col-lg-4 text-center" key={beer.id}>
        <div className="similar-beer m-1 p-3">
          <img
            src={beer.image_url}
            alt=""
            className="img-fluid d-block mx-auto"
          />
          <h6 className="font-weight-bold text-muted my-3">{beer.name}</h6>
        </div>
      </div>
    ));
  };

  render() {
    return (
      <>
        <div className="modal-body py-3">
          <button type="button" className="close" onClick={this.props.onClose}>
            &times;
          </button>

          <div className="row p-2 beer-detail">
            <div className="col-lg-3 mb-2 p-2">
              <img
                src={this.props.beer.image_url}
                alt={this.props.beer.name}
                className="img-fluid d-block mx-auto"
              />
            </div>
            <div className="col-lg-9 p-2">
              <h3 className="text-warning font-weight-bold">
                {this.props.beer.name}
              </h3>
              <h5 className="beer-tagline">{this.props.beer.tagline}</h5>

              <div className="divider my-2" />

              <ul className="list-inline">
                <li className="list-inline-item">
                  <strong>IBU:</strong> {this.props.beer.ibu}
                </li>
                <li className="list-inline-item">
                  <strong>ABV:</strong> {this.props.beer.abv + "%"}
                </li>
                <li className="list-inline-item">
                  <strong>EBC:</strong> {this.props.beer.ebc}
                </li>
              </ul>

              <p className="my-3">{this.props.beer.description}</p>

              <h5 className="text-muted">Best served with:</h5>
              <ul>
                {this.props.beer.food_pairing && this.renderFoodPairing()}
              </ul>
            </div>
          </div>

          <div className="row align-items-center p-2">
            <div className="col">
              <h4 className="my-2 text-warning">You might also like:</h4>
              <div className="row">
                {this.props.beer.similar && this.renderSimilarBeers()}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BeerDetails;
