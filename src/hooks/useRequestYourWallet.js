import {useEffect, useState} from 'react';
import yourWalletService from '../services/yourWalletService';
import {useIsFocused} from '@react-navigation/native';

export const useRequestYourWallet = () => {
  const [balance, setBalance] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    yourWalletService
      .getYourWalletBalanceInfo()
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
  }, [isFocused]);
  return [balance, loader, error];
};
