import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import serviceHistoryService from '../services/serviceHistoryService';

export const useRequestServiceHistory = () => {
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');
  const [stopApiRequest, setStopApiRequest] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const organisationId = useSelector(({auth}) => auth.user.userOrgId);
  const selectedHistoryTypesSaved = useSelector(
    ({serviceHistory}) => serviceHistory.selectedHistoryTypesSaved,
  );
  useEffect(() => {
    serviceHistoryService
      .getServicesHistory(
        organisationId,
        pageNumber,
        10,
        startDate,
        endDate,
        selectedHistoryTypesSaved.map(el => el.name),
      )
      .then(res => {
        if (res.data.length === 0) {
          setStopApiRequest(true);
        }
        setList(prev => [...prev, ...res.data]);
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
  }, [selectedHistoryTypesSaved, endDate, pageNumber]);
  const resetValuesHandler = (type = null) => {
    //reset all values to make api request
    setList([]);
    if (type === 'indicator') {
      setStartDate(null);
      setEndDate(null);
    }
    setLoader(true);
    setStopApiRequest(false);
    setPageNumber(0);
  };
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    //function checks when user scrolls to bottom
    const paddingToBottom = 5;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return [
    list,
    loader,
    error,
    stopApiRequest,
    showCalendar,
    startDate,
    endDate,
    setShowCalendar,
    setStartDate,
    setEndDate,
    setPageNumber,
    resetValuesHandler,
    isCloseToBottom,
  ];
};
