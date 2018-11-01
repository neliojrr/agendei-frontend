import axios from 'axios';

const prodServer = 'https://super.agendei.io/api/';
const VERSION = 'v1';

const api = axios.create({
  baseURL: `${prodServer}${VERSION}`,
});

export default api;
