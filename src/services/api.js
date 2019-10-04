const axios = require('axios');

const environment = process.env.NODE_ENV === "development" ? 'http://localhost:3333' :  process.env.REACT_APP_API_URL ;

console.log(environment);

const api = axios.create({
	baseURL: environment
});

export default api;
