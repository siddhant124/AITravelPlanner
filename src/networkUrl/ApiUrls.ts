import {GEOAPIFY_SEARCH_PLACES_API_KEY} from './SearchPlacesAPIKey';

export const getGeoapifyAutocompleteUrl = (searchText: string): string => {
  return `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&apiKey=${GEOAPIFY_SEARCH_PLACES_API_KEY}`;
};
