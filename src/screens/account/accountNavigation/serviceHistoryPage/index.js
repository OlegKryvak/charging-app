import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import FilterIcon from 'react-native-vector-icons/MaterialIcons';
import {GoBackBtn} from '../../../../components/goBackBtn';
import {Calendar} from '../../../../components/calendar';
import {SelectDropdownTransactions} from '../../../../components/selectDropdown';
import {useRequestServiceHistory} from '../../../../hooks/useRequestServiceHistory';
import {ServiceHistoryItem} from './serviceHistoryItem';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {SelectedDateIndicator} from '../../../../components/selectedDateIndicator/index';

const SELECT_DATA = ['Previous month', 'Select date'];

export const ServiceHistoryPage = () => {
  const [
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
  ] = useRequestServiceHistory();
  const navigation = useNavigation();
  const handleNavigate = title => {
    navigation.navigate(title, {
      resetValuesHandler: resetValuesHandler,
      userType: 'not-admin',
    });
  };
  const selectedTypesSaved = useSelector(
    ({serviceHistory}) => serviceHistory.selectedHistoryTypesSaved,
  );
  return (
    <View style={styles.serviceTransactionsWrapper}>
      <GoBackBtn title="Service history" />
      {showCalendar && (
        <Calendar
          setShowCalendar={setShowCalendar}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          resetValuesHandler={resetValuesHandler}
        />
      )}
      <View style={styles.filterContainer}>
        <SelectDropdownTransactions
          selectData={SELECT_DATA}
          setShowCalendar={setShowCalendar}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          resetValuesHandler={resetValuesHandler}
        />
        <TouchableOpacity
          style={styles.filterIconContainer}
          onPress={() => {
            //reset changes localy for filter screen
            handleNavigate('Transaction filter');
          }}>
          <FilterIcon
            name="filter-list"
            color={'#323232'}
            size={25}
            style={{marginRight: 35, zIndex: 1}}
          />
          {selectedTypesSaved.length > 0 && (
            <View style={styles.filterActive} />
          )}
        </TouchableOpacity>
      </View>
      {endDate && startDate && (
        <SelectedDateIndicator
          startDate={startDate}
          endDate={endDate}
          resetValuesHandler={() => resetValuesHandler('indicator')}
        />
      )}

      <>
        {loader && list.length === 0 ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {!error ? (
              <ScrollView
                style={
                  startDate && endDate
                    ? {height: Dimensions.get('window').height - 190}
                    : {height: Dimensions.get('window').height - 150}
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
                      <ServiceHistoryItem
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
    </View>
  );
};
