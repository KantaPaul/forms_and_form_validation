import axios from 'axios';

let instance = axios.create({
  baseURL: 'https://my-burger-5ae37.firebaseio.com/'
});

export default instance;

