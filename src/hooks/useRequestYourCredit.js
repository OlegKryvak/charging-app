import {useEffect, useState} from 'react';
import yourCreditService from '../services/yourCreditService';

export const useRequestYourCredit = () => {
  const [balance, setBalance] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    yourCreditService
      .getYourCreditBalanceInfo()
      .then(res => {
        setBalance(res.data);
      })
      .catch(err => {
        setError(
          err.response.data?.message
            ? err.response.data?.message
            : err.response.data?.detail,
        );
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);
  return [balance, loader, error];
};
