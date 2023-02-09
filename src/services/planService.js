import api from './api';
//getting all Organisation plan
async function getAllOrganizationPlan(state = null) {
  return api.get(
    `yourplan/moeving_charge/v1/getorganisationplan${
      state ? '?state=' + state : ''
    }`,
  );
}
//getting all personal plan
async function getAllPersonalPlan(state = null) {
  return api.get(
    `yourplan/moeving_charge/v1/getindividualplan${
      state ? '?state=' + state : ''
    }`,
  );
}
async function getStateTypes() {
  return api.get(`generic/moeving_charge/v1/states`);
}

export default {
  getAllOrganizationPlan,
  getAllPersonalPlan,
  getStateTypes,
};
