import api from './api';

async function getStateTypes() {
  return api.get(`moeving_charge/generic/v1/states`);
}

export default {
  getStateTypes,
};
