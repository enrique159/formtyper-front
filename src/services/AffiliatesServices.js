import axios from 'axios';

export default {
  getAffiliates(page = 1, limit = 10, sort = 'createdAt', order = 'desc', search = '') {
    return axios.get(`/affiliates/getAffiliates?page=${page}&limit=${limit}&sort=${sort}&order=${order}&search=${search}`)
      .then(response => response)
      .catch(error => error.response);
  }
}