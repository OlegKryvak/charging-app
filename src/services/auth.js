import api from './api';

async function login(_token) {
  return api.post('login/moeving_charge/v1/login', null, {
    params: {
      token: _token,
    },
  });
}

function logout() {
  return api.post('login/moeving_charge/v1/logout');
}

export default {login, logout};
