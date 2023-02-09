import React, {useState} from 'react';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
import ArrowDropDown from 'react-native-vector-icons/MaterialIcons';

export const SelectDropdownTransactions = ({
  selectData,
  setShowCalendar,
  setStartDate,
  setEndDate,
  resetValuesHandler = null,
}) => {
  return (
    <SelectDropdown
      data={selectData}
      onSelect={(selectedItem, index) => {
        if (selectedItem === 'Select date') {
          setShowCalendar(true);
        }
        if (selectedItem === 'Previous month') {
          let day = moment().date();
          let month = moment().month(); // jan=0, dec=11
          let year = moment().year();
          if (month === 0) {
            year -= 1;
            month = 12;
            day = day < 10 ? '0' + day : day;
            setStartDate(moment('' + year + month + day).format('YYYY-MM-DD'));
          } else {
            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;
            setStartDate(moment('' + year + month + day).format('YYYY-MM-DD'));
          }
          setEndDate(moment().format('YYYY-MM-DD'));
          resetValuesHandler();
        }
      }}
      dropdownOverlayColor="transparent"
      buttonStyle={{
        height: 50,
        width: 106,
        backgroundColor: 'transparent',
      }}
      buttonTextStyle={{
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        width: 10,
        color: '#AFB1B4',
        textAlign: 'left',
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return 'Recent';
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
      defaultButtonText="Recent"
      renderDropdownIcon={isOpened => {
        return (
          <ArrowDropDown
            name={isOpened ? 'arrow-drop-up' : 'arrow-drop-down'}
            color={'#444'}
            size={18}
            style={{marginRight: 0}}
          />
        );
      }}
      dropdownStyle={{
        width: 190,
        backgroundColor: 'white',
        borderRadius: 4,
      }}
      rowStyle={{
        height: 54,
      }}
      rowTextStyle={{
        textAlign: 'left',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: '#979797',
      }}
    />
  );
};
