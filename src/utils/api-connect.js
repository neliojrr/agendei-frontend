import axios from 'axios';

const prodServer = 'https://super.agendei.io/api/';
// const localServer = 'http://192.168.0.189:3000/api/';
const VERSION = 'v1';

export const api = axios.create({
  baseURL: `${prodServer}${VERSION}`,
});

export const login = axios.create({
  baseURL: `${prodServer}${VERSION}`,
});

// Add a request interceptor for api
api.interceptors.request.use((config) => {
  if (config.url === '/auth/sign_out') {
    window.localStorage.setItem('user', null);
    window.localStorage.setItem('salon', null);
    window.localStorage.setItem('agendeiAuth', null);
  }
  const agendeiAuth = JSON.parse(window.localStorage.getItem('agendeiAuth')) || {};
  if (agendeiAuth && agendeiAuth.token) {
    const newConfig = config;
    const { headers } = newConfig;
    newConfig.headers = {
      ...headers,
      'access-token': agendeiAuth.token,
      client: agendeiAuth.client,
      uid: agendeiAuth.uid,
    };
    return newConfig;
  }
  return config;
}, error => Promise.reject(error));

// Add a response interceptor for others api requests
api.interceptors.response.use(response => response, (error) => {
  const { status } = error && error.response ? error.response : 0;
  if (status === 401 || status === 403) {
    window.localStorage.setItem('user', null);
    window.localStorage.setItem('salon', null);
    window.localStorage.setItem('agendeiAuth', null);
    window.location = '/login';
    return null;
  }
  return Promise.reject(error);
});

// Add a response interceptor for login
login.interceptors.response.use((response) => {
  const { data } = response;
  const user = { ...data };
  const agendeiAuthorization = {
    token: response.headers['access-token'],
    client: response.headers.client,
    uid: response.headers.uid,
  };
  window.localStorage.setItem(
    'agendeiAuth',
    JSON.stringify(agendeiAuthorization),
  );
  window.localStorage.setItem(
    'user',
    JSON.stringify(user),
  );
  window.localStorage.setItem(
    'salon',
    JSON.stringify(user.salon),
  );
  return response;
}, error => Promise.reject(error));
