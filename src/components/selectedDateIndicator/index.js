import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
// import DatePicker from 'react-native-styled-datepicker';
import moment from 'moment';
import CloseIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const SelectedDateIndicator = ({
  startDate,
  endDate,
  resetValuesHandler,
}) => {
  const startDateFormatted = moment(startDate).format('DD MMM');
  const endDateFormatted = moment(endDate).format('DD MMM');
  return (
    <View style={{alignItems: 'flex-start'}}>
      <View style={styles.container}>
        <Text
          style={
            styles.text
          }>{`${startDateFormatted} - ${endDateFormatted}`}</Text>
        <TouchableOpacity
          onPress={() => resetValuesHandler()}
          style={styles.closeBtnContainer}>
          <CloseIcon name="close" size={20} color="#323232" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8EE8BD',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingVertical: 6,
    borderRadius: 18,
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    color: '#212325',
    fontSize: 14,
    height: '100%',
  },
  closeBtnContainer: {
    width: 25,
    marginLeft: 5,
  },
});
