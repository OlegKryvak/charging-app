import React, {useEffect} from 'react';
import {useState} from 'react';
import {Dimensions, ScrollView, Text} from 'react-native';
import {styles} from './styles';
import transactionsService from '../../../../../../services/orgManagementService';
import {TransactionsCreditItem} from './transactionsCreditItem';

const PAGE_COUNT_INCREASE = 10;

export const TransactionsCredit = ({
  organisationId,
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
}) => {
  const [error, setError] = useState('');

  useEffect(() => {
    transactionsService
      .getCredit(
        organisationId,
        pageNumber,
        PAGE_COUNT_INCREASE,
        startDate,
        endDate,
      )
      .then(res => {
        if (res.data.length === 0) {
          //made for stopping pagination server request
          setStopApiRequest(true);
        } else {
          //if data comes, it is set to end of list
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
                list.map(item => {
                  return (
                    <TransactionsCreditItem
                      item={item}
                      key={item.transactionid}
                    />
                  );
                })
              ) : (
                <Text style={styles.noData}>No credit transactions</Text>
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
