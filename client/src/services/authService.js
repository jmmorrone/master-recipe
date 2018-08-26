import axios from 'axios';

const login = () => {
  const url = '/login';
  return axios.get(url);
};

export default login;
