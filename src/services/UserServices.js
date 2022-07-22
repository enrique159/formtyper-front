import axios from 'axios';

export default {
  getUser(id) {
    return axios.get(`/users/${id}`)
    .then(response => response)
    .catch(error => error.response);
  }, 
};