import { beerActionTypes as actionTypes } from "../actions/types";

const initialState = {
  beers: [],
  favourites: [],
  selected: {
    beer: {},
    similar: []
  },
  page: 1,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_BEERS:
      return {
        ...state,
        beers: action.payload.beers,
        page: action.payload.page + 1,
        isLoading: action.payload.isLoading
      };

    case actionTypes.FETCHING_BEERS:
      return { ...state, isLoading: action.payload.isLoading };

    case actionTypes.FETCH_MORE_BEERS:
      return {
        ...state,
        beers: [...state.beers, ...action.payload.beers],
        page: action.payload.page + 1,
        isLoading: action.payload.isLoading
      };

    case actionTypes.SEARCH_BEERS:
      return {
        ...state,
        beers: action.payload.beers,
        isLoading: action.payload.isLoading
      };

    case actionTypes.HANDLE_FAVOURITE_BEER:
      // grab favourites from state
      let favourites = [...state.favourites];
      let favBeer = action.payload.beer;

      // check if beer is in favourites
      if (favourites.indexOf(favBeer) !== -1) {
        favourites = favourites.filter(item => item !== favBeer); // yes? remove it
      } else favourites.push(favBeer); // no? add it

      return { ...state, favourites: favourites };

    case actionTypes.DISPLAY_BEER:
      return { ...state, selected: action.payload.selected, isLoading: false };

    default:
      return state;
  }
}
