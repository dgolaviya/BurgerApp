import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerapp-e4415.firebaseio.com'
});

export default instance;
