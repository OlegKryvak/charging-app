import api from './api';

async function getProfileInfo() {
  return api
    .get('userprofile/moeving_charge/v1/listuserdata')
    .then(response => {
      if (response && response.data) {
        return response.data;
      }
      throw new Error('Server sent empty data');
    })
    .catch(err => console.error(err));
}

async function updateProfileInfo() {
  return api
    .post('userprofile/moeving_charge/v1/update/post?update_done=true')
    .then(res => {
      if (res && res.data) {
        return res.data;
      }
      throw new Error('Server sent empty data');
    })
    .catch(err => console.error(err));
}

async function getUserOrg() {
  return api.get('generic/moeving_charge/v1/getuserorg');
}

export {getProfileInfo, updateProfileInfo, getUserOrg};
