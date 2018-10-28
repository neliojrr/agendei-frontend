import axios from 'axios';

const VERSION = 'v1';

const api = axios.create({
  baseURL: `https://super.agendei.io/api/${VERSION}`,
  headers: {
    Authorization: 'Bearer {token}',
  },
  withCredentials: true,
});

export default api;
