import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import ArrowDropdown from 'react-native-vector-icons/MaterialIcons';

const arrowDropdown = (
  <ArrowDropdown
    name="arrow-drop-down"
    style={{marginRight: 22}}
    size={25}
    color="#323232"
  />
);
import SelectDropdown from 'react-native-select-dropdown';
const SelectYourState = ({states, setIsBackground, setSelectedState}) => {
  const textInput = useRef(null);

  return (
    <View>
      <SelectDropdown
        data={states}
        onSelect={(selectedItem, index) => {
          setSelectedState(selectedItem.title);
        }}
        dropdownOverlayColor="transparent"
        onFocus={() => {
          setIsBackground(true);
        }}
        onBlur={() => {
          setIsBackground(false);
        }}
        buttonStyle={styles.dropdownBtnStyle}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <View style={styles.dropdownBtnChildStyle}>
              <Text style={styles.dropdownBtnTxt}>
                {selectedItem ? selectedItem.title : 'Select your state'}
              </Text>
              {arrowDropdown}
            </View>
          );
        }}
        dropdownStyle={styles.dropdownDropdownStyle}
        rowStyle={styles.dropdownRowStyle}
        renderCustomizedRowChild={(item, index) => {
          return (
            <View style={styles.dropdownRowChildStyle}>
              <Text style={styles.dropdownRowTxt}>{item.title}</Text>
            </View>
          );
        }}
        search
        searchInputStyle={styles.dropdownsearchInputStyleStyle}
        searchPlaceHolder={'Select your state'}
        searchPlaceHolderColor={'#19181A'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownBtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 0,
    border: 'none',
    borderRadius: 12,
  },
  dropdownBtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownBtnTxt: {
    color: '#979797',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginTop: 1,
    marginLeft: 9,
  },
  dropdownDropdownStyle: {
    backgroundColor: 'white',
    marginTop: -50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%',
    shadowColor: 'transparent',
  },
  dropdownRowStyle: {
    backgroundColor: 'white',
    borderBottomColor: '#F4F2F2',
    height: 68,
  },
  dropdownRowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 68,
    paddingHorizontal: 0,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdownRowTxt: {
    color: '#19181A',
    fontFamily: 'Poppins-Regular',
    lineHeight: 68,
    fontSize: 16,
  },
  dropdownsearchInputStyleStyle: {
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    borderRadius: 20,
    marginBottom: 9,
  },
});

export default SelectYourState;
