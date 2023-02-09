import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GoBackBtn} from '../../../../../components/goBackBtn';
import FilterIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Calendar} from '../../../../../components/calendar';
import {SelectDropdownTransactions} from '../../../../../components/selectDropdown';
import styles from './style';
import {resetSelectedUsersNotSaved} from '../../../../../redux/slices/transactionsSlice';
import {TransactionsWallet} from './transactionsWallet';
import {TransactionsCredit} from './transactionsCredit';
import {TransactionsServices} from './transactionsServices';
import {SelectedDateIndicator} from '../../../../../components/selectedDateIndicator';

const SELECT_DATA = ['Previous month', 'Select date'];

export const ViewAllTransactions = () => {
  const organisationId = useSelector(
    ({transactions}) => transactions.organisationId,
  );
  const selectedTransactionsSaved = useSelector(
    ({transactions}) => transactions.selectedTransactionsSaved,
  );
  const selectedTypesSaved = useSelector(
    ({transactions}) => transactions.selectedTypesSaved,
  );
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [stopApiRequest, setStopApiRequest] = useState(false);
  const [loader, setLoader] = useState(true);
  const [selectedTab, setSelect] = useState('Wallet');
  //date filter
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigation = useNavigation();

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
  const handleNavigate = title => {
    navigation.navigate(title, {
      resetValuesHandler: resetValuesHandler,
      userType: 'admin',
    });
  };
  return (
    <View style={styles.manageUsersWrapper}>
      {showCalendar && (
        <Calendar
          setShowCalendar={setShowCalendar}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          resetValuesHandler={resetValuesHandler}
        />
      )}
      <>
        <GoBackBtn title="All transactions" />
        {/* TabBar Buttons*/}
        <View style={styles.buttonsContainer}>
          {['Wallet', 'Credit', 'Services'].map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                //if select tab all data i reset to make new request
                resetValuesHandler('indicator');
                setSelect(tab);
              }}>
              <Text
                style={
                  selectedTab === tab ? styles.activedBtn : styles.unActivedBtn
                }>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Filters */}
        <View style={styles.filterContainer}>
          <SelectDropdownTransactions
            selectData={SELECT_DATA}
            setShowCalendar={setShowCalendar}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            resetValuesHandler={resetValuesHandler}
          />
          {selectedTab === 'Services' && (
            <TouchableOpacity
              style={styles.filterIconContainer}
              onPress={() => {
                //reset changes localy for filter screen
                dispatch(resetSelectedUsersNotSaved());
                handleNavigate('Transaction filter');
              }}>
              <FilterIcon
                name="filter-list"
                color={'#323232'}
                size={25}
                style={{marginRight: 35, zIndex: 1}}
              />
              {(selectedTransactionsSaved.length > 0 ||
                selectedTypesSaved.length > 0) && (
                <View style={styles.filterActive} />
              )}
            </TouchableOpacity>
          )}
        </View>
        {endDate && startDate && (
          <SelectedDateIndicator
            startDate={startDate}
            endDate={endDate}
            resetValuesHandler={() => resetValuesHandler('indicator')}
          />
        )}
        <View>
          {selectedTab === 'Wallet' && (
            <TransactionsWallet
              organisationId={organisationId}
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
              heightDif={600}
            />
          )}
          {selectedTab === 'Credit' && (
            <TransactionsCredit
              organisationId={organisationId}
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
            />
          )}
          {selectedTab === 'Services' && (
            <TransactionsServices
              organisationId={organisationId}
              startDate={startDate}
              endDate={endDate}
              selectedTypesSaved={selectedTypesSaved}
              selectedTransactionsSaved={selectedTransactionsSaved}
              list={list}
              setList={setList}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              stopApiRequest={stopApiRequest}
              loader={loader}
              setLoader={setLoader}
              setStopApiRequest={setStopApiRequest}
            />
          )}
        </View>
      </>
    </View>
  );
};
