import api from './api';

async function getServicesHistory(
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
    `serviceusage/moeving_charge/v1/serviceusage?${
      servicetype ? servicetypeRequest : ''
    }${identifier ? identifierRequest : ''}${
      startDay ? `startdate=${startDay}&` : ''
    }${
      endDay ? `enddate=${endDay}&` : ''
    }organisationid=${organisationId}&pagenumber=${pageNumber}&pagesize=${pageSize}`,
  );
}

export default {
  getServicesHistory,
};
