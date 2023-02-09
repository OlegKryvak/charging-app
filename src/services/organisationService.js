import api from './api';

async function inviteUser(orgId, inviteThrough, userInviteName) {
  return api
    .put('/orgmanagement/moeving_charge/v1/inviteuser', null, {
      params: {
        organisationid: orgId,
        identifiedthrough: inviteThrough,
        identifier: userInviteName,
      },
    })
    .then(response => {
      if (response && response.data) {
        return response.data;
      }
      throw new Error('Server sent empty data');
    })
    .catch(err => {
      console.error(JSON.stringify(err));
      return Promise.reject(err);
    });
}

async function getUsageLimit(orgId) {
  return api
    .get('/orgmanagement/moeving_charge/v1/showlimit', {
      params: {organisationid: orgId},
    })
    .then(response => {
      if (response && response.data) {
        return response.data;
      }
      throw new Error('Server sent empty data');
    })
    .catch(err => Promise.reject(err));
}

async function updateUsageLimit(orgId, newLimit) {
  return api
    .put('/orgmanagement/moeving_charge/v1/changelimit', null, {
      params: {
        organisationid: orgId,
        new_limit: newLimit,
      },
    })
    .then(response => {
      if (response && response.data) {
        return response.data;
      }
      throw new Error('Server sent empty data');
    })
    .catch(err => Promise.reject(err));
}

export {inviteUser, getUsageLimit, updateUsageLimit};
