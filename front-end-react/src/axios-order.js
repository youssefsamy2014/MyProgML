import axios from 'axios';


const instance = axios.create({

    baseURL:'http://YoussefSami:8080/'

});

export default instance;