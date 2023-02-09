import api from './api';
//manage Users screen
async function deleteUser(id, organisationId, showsuspended) {
  return api.put(
    `http://ec2-3-110-168-14.ap-south-1.compute.amazonaws.com:8099/orgmanagement/moeving_charge/v1/deleteuser?inviteid=${id}&organisationid=${organisationId}&issuspended=${showsuspended}`,
  );
}
async function getAllUsers(
  showsuspended,
  organisationId,
  pageNumber,
  identifier = null,
) {
  return api.get(
    `orgmanagement/moeving_charge/v1/users?organisationid=${organisationId}&sorttype=asc&showsuspended=${showsuspended}&${
      identifier ? `identifier=${identifier}&` : ''
    }pagenumber=${pageNumber}&pagesize=10`,
  );
}
async function getAllUsersAmount(showsuspended, organisationId) {
  return api.get(
    `orgmanagement/moeving_charge/v1/users_count?organisationid=${organisationId}&showsuspended=${showsuspended}`,
  );
}
async function getOrganisationInfo() {
  return api.get(`orgmanagement/moeving_charge/v1/organisationinfo`);
}
//View all transactions screen
async function getWallet(
  organisationId,
  pageNumber,
  pageSize,
  startDay = null,
  endDay = null,
) {
  return api.get(
    `orgmanagement/moeving_charge/v1/walletusage?${
      startDay ? `startdate=${startDay}&` : ''
    }${
      endDay ? `enddate=${endDay}&` : ''
    }organisationid=${organisationId}&pagenumber=${pageNumber}&pagesize=${pageSize}`,
  );
}
async function getCredit(
  organisationId,
  pageNumber,
  pageSize,
  startDay = null,
  endDay = null,
) {
  return api.get(
    `orgmanagement/moeving_charge/v1/crediteusage?${
      startDay ? `startdate=${startDay}&` : ''
    }${
      endDay ? `enddate=${endDay}&` : ''
    }organisationid=${organisationId}&pagenumber=${pageNumber}&pagesize=${pageSize}`,
  );
}
async function getServices(
  organisationId,
  pageNumber,
  pageSize,
  startDay = null,
  endDay = null,
  servicetype = null,
  identifier = null,
) {
  let servicetypeRequest = '';
  let identifierRequest = '';
  if (servicetype) {
    servicetype.forEach(type => {
      servicetypeRequest += 'servicetype=' + type.toUpperCase() + '&';
    });
  }
  if (identifier) {
    identifier.forEach(el => {
      identifierRequest += `identifier=${
        el.split('')[0] === '+' ? `%2B${el.slice(1, el.length)}` : el
      }&`;
    });
  }
  return api.get(
    `orgmanagement/moeving_charge/v1/serviceusage?${
      servicetype ? servicetypeRequest : ''
    }${identifier ? identifierRequest : ''}${
      startDay ? `startdate=${startDay}&` : ''
    }${
      endDay ? `enddate=${endDay}&` : ''
    }organisationid=${organisationId}&pagenumber=${pageNumber}&pagesize=${pageSize}`,
  );
}

async function getServicesType() {
  return api.get('generic/moeving_charge/v1/servicetypes');
}
async function getUsers(organisationId, pagenumber, pagesize) {
  return api.get(
    `orgmanagement/moeving_charge/v1/usersidentification?organisationid=${organisationId}&pagenumber=${pagenumber}&pagesize=${pagesize}`,
  );
}

export default {
  getAllUsersAmount,
  deleteUser,
  getAllUsers,
  getOrganisationInfo,
  getWallet,
  getCredit,
  getServices,
  getServicesType,
  getUsers,
};
