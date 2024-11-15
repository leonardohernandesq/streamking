import axios from 'axios';

// BASE URL: https://api.themoviedb.org/3/
// URL: /movie/now_playing?api_key=4f76b4adaf3710ab64c9754a8afac6da&language=pt-BR
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;