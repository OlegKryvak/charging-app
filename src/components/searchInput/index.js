import React from 'react';
import {SearchBar} from 'react-native-elements';
import {Dimensions, LogBox} from 'react-native';
LogBox.ignoreLogs(['EventEmitter.removeListener']);

export const SearchInput = ({text, setText, placeholderText}) => {
  const updateSearch = search => {
    setText(search);
  };
  return (
    <SearchBar
      platform="android"
      placeholder={placeholderText}
      onChangeText={updateSearch}
      value={text}
      containerStyle={{
        marginTop: 24,
        marginBottom: 16,
        backgroundColor: '#F2F2F2',
        padding: 0,
        height: 56,
        borderRadius: 12,
      }}
      inputContainerStyle={{
        marginTop: -5,

        marginLeft: 9,
        paddingRight: 9,
        color: '#19181A',
      }}
      inputStyle={{
        marginLeft: 0,
      }}
      searchIcon={{color: '#AFB1B4'}}
      clearIcon={{color: '#19181A'}}
      cancelIcon={false}
      placeholderTextColor="#AFB1B4"
    />
  );
};
