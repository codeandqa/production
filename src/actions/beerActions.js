import { beerActionTypes as actionTypes } from "./types";

export const fetchBeers = (page = 1) => dispatch => {
  // dispatch loading state: true
  dispatch({ type: actionTypes.FETCHING_BEERS, payload: { isLoading: true } });

  const url = `https://api.punkapi.com/v2/beers?page=${page}`;
  fetch(url)
    .then(res => res.json())
    .then(beers =>
      dispatch({
        type: actionTypes.FETCH_BEERS,
        payload: { beers, page, isLoading: false }
      })
    );
};

export const fetchMoreBeers = page => dispatch => {
  // dispatch loading state: true
  dispatch({ type: actionTypes.FETCHING_BEERS, payload: { isLoading: true } });

  const url = `https://api.punkapi.com/v2/beers?page=${page}`;
  fetch(url)
    .then(res => res.json())
    .then(beers =>
      dispatch({
        type: actionTypes.FETCH_MORE_BEERS,
        payload: { beers, page, isLoading: false }
      })
    );
};

export const searchBeers = keyword => dispatch => {
  // dispatch loading state: true
  dispatch({ type: actionTypes.FETCHING_BEERS, payload: { isLoading: true } });

  const url = `https://api.punkapi.com/v2/beers?beer_name=${keyword}`;
  fetch(url)
    .then(res => res.json())
    .then(beers => {
      dispatch({
        type: actionTypes.SEARCH_BEERS,
        payload: { beers, isLoading: false }
      });
    });
};

export const handleFavourite = beer => dispatch =>
  dispatch({
    type: actionTypes.HANDLE_FAVOURITE_BEER,
    payload: { beer }
  });

export const displayBeer = beer => dispatch => {
  // dispatch loading state: true
  dispatch({ type: actionTypes.FETCHING_BEERS, payload: { isLoading: true } });

  // fetch similar beers based on their yeast ingredient
  const url = `https://api.punkapi.com/v2/beers?per_page=3&yeast=${
    beer.ingredients.yeast
  }`;

  fetch(url)
    .then(res => res.json())
    .then(beers => {
      // compose selected beer and similar beers into bundle
      let selected = beer;
      selected.similar = beers;
      dispatch({
        type: actionTypes.DISPLAY_BEER,
        payload: { selected, isLoading: false }
      });
    });
};
