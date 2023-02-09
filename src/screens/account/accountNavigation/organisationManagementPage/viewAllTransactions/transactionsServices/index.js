import React, {useEffect} from 'react';
import {useState} from 'react';
import {Dimensions, ScrollView, Text} from 'react-native';
import {styles} from './styles';
import {TransactionsServicesItem} from './transactionsServicesItem';
import transactionsService from '../../../../../../services/orgManagementService';

const PAGE_COUNT_INCREASE = 10;

export const TransactionsServices = ({
  organisationId,
  startDate,
  endDate,
  selectedTypesSaved,
  selectedTransactionsSaved,
  list,
  setList,
  pageNumber,
  setPageNumber,
  stopApiRequest,
  setStopApiRequest,
  loader,
  setLoader,
}) => {
  const [error, setError] = useState('');

  useEffect(() => {
    transactionsService
      .getServices(
        organisationId,
        pageNumber,
        PAGE_COUNT_INCREASE,
        startDate,
        endDate,
        selectedTypesSaved.map(el => el.name),
        selectedTransactionsSaved.map(el => el.name),
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
  }, [selectedTransactionsSaved, selectedTypesSaved, endDate, pageNumber]);
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    //function checks when user scrolls to bottom
    const paddingToBottom = 5;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <>
      {loader && list.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {!error ? (
            <ScrollView
              style={
                startDate && endDate
                  ? {height: Dimensions.get('window').height - 270}
                  : {height: Dimensions.get('window').height - 230}
              }
              onScroll={({nativeEvent}) => {
                //checking if scrolled to bottom
                if (isCloseToBottom(nativeEvent)) {
                  if (!stopApiRequest) {
                    //if is bottom and data comes, increase page count
                    setPageNumber(prev => (prev += 1));
                  }
                }
              }}
              scrollEventThrottle={400}>
              {list.length > 0 ? (
                list.map(service => {
                  return (
                    <TransactionsServicesItem
                      key={service.transactionid}
                      item={service}
                    />
                  );
                })
              ) : (
                <Text style={styles.noData}>No transactions</Text>
              )}
            </ScrollView>
          ) : (
            <Text style={styles.error}>{error}</Text>
          )}
        </>
      )}
    </>
  );
};
