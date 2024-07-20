import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_exPmnOXNG0UNZJETmpn9APjy5STG8sNljdFbV486yu0HyOYYm6C62gkJ2CCKzxqT';

const BASE_URL = 'https://api.thecatapi.com/v1/';

export function getBreeds() {
  return fetch(
    `${BASE_URL}breeds?api_key=${axios.defaults.headers.common['x-api-key']}`
  ).then(respons => {
    if (!respons.ok) {
      throw new Error(respons.status);
    }
    return respons.json();
  });
}

export function getBreedsId(id) {
  return fetch(
    `${BASE_URL}images/search?&breed_ids=${id}&api_key=${axios.defaults.headers.common['x-api-key']}`
  ).then(respons => {
    if (!respons.ok) {
      throw new Error(respons.status);
    }
    return respons.json();
  });
}
