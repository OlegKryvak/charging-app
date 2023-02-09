import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as RootNavigation from '../navigation/RootNavigation';

const api = axios.create({
  baseURL: 'http://3.110.168.14:8099/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('@access_token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const responseBody = error.response.data;
    if (
      error.response.status === 403 &&
      responseBody.message === 'Session Not Matched'
    ) {
      RootNavigation.navigate('Login');
    }
    return Promise.reject(error);
  },
);

export default api;
