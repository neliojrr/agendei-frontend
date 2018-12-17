import axios from 'axios';

const prodServer = 'https://super.agendei.io/api/';
// const localServer = 'http://localhost:3000/api/';
const VERSION = 'v1';
const agendeiAuth = JSON.parse(window.sessionStorage.getItem('agendeiAuth')) || {};
const {
  token = '', client = '', uid = '', authorization = '',
} = agendeiAuth;

export const api = axios.create({
  baseURL: `${prodServer}${VERSION}`,
  headers: {
    'access-token': token,
    client,
    uid,
    Authorization: authorization,
  },
});

export const login = axios.create({
  baseURL: `${prodServer}${VERSION}`,
});

// Add a request interceptor for api
api.interceptors.request.use((config) => {
  if (agendeiAuth && agendeiAuth.token) {
    return config;
  }
  window.location = '/login';
  return null;
}, error => Promise.reject(error));

// Add a response interceptor for others api requests
api.interceptors.response.use(response => response, function (error) {
  const { status } = error && error.response ? error.response : 0;
  if (status === 401 || status === 403) {
    window.sessionStorage.setItem('user', null);
    window.sessionStorage.setItem('salon', null);
    window.sessionStorage.setItem('agendeiAuth', null);
    this.$toast.open({
      message: 'Você não está autorizado para acessar esta página. Faça seu login novamente',
      type: 'is-danger',
    });
    this.$router.push('/login');
    return null;
  }
  return Promise.reject(error);
});

// Add a response interceptor for login
login.interceptors.response.use((response) => {
  const { data } = response;
  const user = { ...data.user };
  const agendeiAuthorization = {
    token: response.headers['access-token'],
    client: response.headers.client,
    uid: response.headers.uid,
    authorization: response.headers.Authorization,
  };
  window.sessionStorage.setItem(
    'agendeiAuth',
    JSON.stringify(agendeiAuthorization),
  );
  window.sessionStorage.setItem(
    'user',
    JSON.stringify(user),
  );
  window.sessionStorage.setItem(
    'salon',
    JSON.stringify(user.salon),
  );
  return response;
}, error => Promise.reject(error));
