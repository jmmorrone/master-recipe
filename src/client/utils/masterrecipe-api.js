import axios from 'axios';

function getAllRecipes() {
  const url = '/api/recipes';
  return axios.get(url).then(response => response.data);
}

export default getAllRecipes;
