import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from './style';
import {SelectDropdownTransactions} from '../selectDropdown';
import {SelfTransactionsItems} from './selfTransactionsItems';
import {Calendar} from '../calendar';
import {SelectedDateIndicator} from '../selectedDateIndicator';

const SELECT_DATA = ['Previous month', 'Select date'];

export const SelfTransactions = ({service, type}) => {
  const [list, setList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [stopApiRequest, setStopApiRequest] = useState(false);
  const [loader, setLoader] = useState(true);
  //date filter
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const resetValuesHandler = (type = null) => {
    //reset all values to make api request
    setList([]);
    if (type === 'indicator') {
      //if date range is closen
      setStartDate(null);
      setEndDate(null);
    }
    setLoader(true);
    setStopApiRequest(false);
    setPageNumber(0);
  };
  return (
    <View style={styles.pageWrapper}>
      {showCalendar && (
        <Calendar
          setShowCalendar={setShowCalendar}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          resetValuesHandler={resetValuesHandler}
          type={type}
        />
      )}
      <View style={styles.container}>
        <SelectDropdownTransactions
          selectData={SELECT_DATA}
          setShowCalendar={setShowCalendar}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          resetValuesHandler={resetValuesHandler}
        />
        {endDate && startDate && (
          <SelectedDateIndicator
            startDate={startDate}
            endDate={endDate}
            resetValuesHandler={() => resetValuesHandler('indicator')}
          />
        )}
        <SelfTransactionsItems
          startDate={startDate}
          endDate={endDate}
          list={list}
          setList={setList}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          stopApiRequest={stopApiRequest}
          setStopApiRequest={setStopApiRequest}
          loader={loader}
          setLoader={setLoader}
          service={service}
          type={type}
        />
      </View>
    </View>
  );
};
