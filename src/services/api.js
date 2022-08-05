import axios from "axios";

// url da api :  https://api.themoviedb.org/3/movie/now_playing?api_key=00a0af8cc8e6c9de35c08977412a6864&language=pt-BR
// BASE DA API : https://api.themoviedb.org/3/


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
  });

export default api;