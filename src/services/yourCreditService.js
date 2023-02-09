import api from './api';

async function getYourCreditBalanceInfo() {
  return api.get('transaction/moeving_charge/v1/creditbalance');
}

async function getSelfTransactions(
  pageNumber,
  pageSize,
  startDay = null,
  endDay = null,
) {
  return api.get(
    `serviceusage/moeving_charge/v1/crediteusage?${
      startDay ? `startdate=${startDay}&` : ''
    }${
      endDay ? `enddate=${endDay}&` : ''
    }pagenumber=${pageNumber}&pagesize=${pageSize}`,
  );
}

export default {
  getYourCreditBalanceInfo,
  getSelfTransactions,
};
