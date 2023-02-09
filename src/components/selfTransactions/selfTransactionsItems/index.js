import React, {useEffect} from 'react';
import {useState} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {SelfTransactionsItem} from './selfTransactionsItem';
import {styles} from './styles.js';
const PAGE_COUNT_INCREASE = 20;
export const SelfTransactionsItems = ({
  startDate,
  endDate,
  setStopApiRequest,
  stopApiRequest,
  pageNumber,
  setPageNumber,
  setList,
  list,
  loader,
  setLoader,
  service,
  type,
}) => {
  const [error, setError] = useState('');

  useEffect(() => {
    service
      .getSelfTransactions(pageNumber, PAGE_COUNT_INCREASE, startDate, endDate)
      .then(res => {
        if (res.data.length === 0) {
          //if there is no data , api request isn't sent
          setStopApiRequest(true);
        } else {
          setList(prev => [...prev, ...res.data]);
        }
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
  }, [endDate, pageNumber]);
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
                type === 'credits'
                  ? startDate && endDate
                    ? {height: Dimensions.get('window').height - 360}
                    : {height: Dimensions.get('window').height - 320}
                  : startDate && endDate
                  ? {height: Dimensions.get('window').height - 150}
                  : {height: Dimensions.get('window').height - 110}
              }
              onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  if (!stopApiRequest) {
                    setPageNumber(prev => (prev += 1)); //increasing page number for next api request
                  }
                }
              }}
              scrollEventThrottle={400}>
              {list.length > 0 ? (
                list.map(item => {
                  return (
                    <SelfTransactionsItem
                      item={item}
                      key={item.transactionid}
                    />
                  );
                })
              ) : (
                <Text style={styles.noData}>No wallet transactions</Text>
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
