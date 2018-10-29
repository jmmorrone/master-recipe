import axios from 'axios';

const getAccessToken = () => localStorage.getItem('access_token');

const getAllRecipes = () => {
  const url = '/api/recipes';
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` } }).then(response => response.data);
};

const searchRecipes = (query) => {
  const url = '/api/search';
  return axios.post(url, query).then(response => response.data);
};

export { getAllRecipes, searchRecipes };
