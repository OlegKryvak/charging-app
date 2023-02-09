import {useEffect, useState} from 'react';
import yourWalletService from '../services/yourWalletService';

export const useRequestStartChargingSelectPlan = service => {
  const [info, setInfo] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    service
      .then(res => {
        setInfo(res.data);
      })
      .catch(error => {
        if (error.response.status === 500) {
          setError('Failed to load data. Please try again later');
        } else {
          setError(
            error.response.data?.message
              ? error.response.data?.message
              : error.response.data?.detail,
          );
        }
      })
      .finally(() => {
        setLoader(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [info, loader, error];
};
