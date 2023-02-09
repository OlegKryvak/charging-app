import api from './api';

async function getYourWalletBalanceInfo() {
  return api.get('transaction/moeving_charge/v1/walletbalance');
}

async function getSelfTransactions(
  pageNumber,
  pageSize,
  startDay = null,
  endDay = null,
) {
  return api.get(
    `serviceusage/moeving_charge/v1/walletusage?${
      startDay ? `startdate=${startDay}&` : ''
    }${
      endDay ? `enddate=${endDay}&` : ''
    }pagenumber=${pageNumber}&pagesize=${pageSize}`,
  );
}

function createOrder(amt, orgId) {
  let url = `transaction/moeving_charge/v1/getorderid?amount=${amt}`;
  if (orgId) {
    url += `&organisationid=${orgId}`;
  }
  console.log(url);
  return api
    .get(url)
    .then(res => res)
    .catch(err => Promise.reject(err));
}

function getRechargeStatus(paymentId, orderId, signature, orgId) {
  let url = `transaction/moeving_charge/v1/getrechargestatus?razorpay_payment_id=${paymentId}&razorpay_order_id=${orderId}&razorpay_signature=${signature}`;
  if (orgId) {
    url += `&organisationid=${orgId}`;
  }
  console.log(url);
  return api
    .get(url)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

export default {
  getYourWalletBalanceInfo,
  createOrder,
  getRechargeStatus,
  getSelfTransactions,
};
