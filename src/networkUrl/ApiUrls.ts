const GEOAPIFY_SEARCH_PLACES_API_KEY = '29bfe51b75054fcb82d2e6ea5ba61f93';

export const getGeoapifyAutocompleteUrl = (searchText: string): string => {
  return `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&apiKey=${GEOAPIFY_SEARCH_PLACES_API_KEY}`;
};
