import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

export const Calendar = ({
  setShowCalendar,
  setStartDate,
  setEndDate,
  resetValuesHandler = null,
  type = null,
}) => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      zIndex: 5,
      backgroundColor: 'white',
      top: type === 'credits' ? 0 : 200,
      left: 20,
      alignItems: 'center',
      borderRadius: 12,
      borderColor: 'lightgrey',
      borderWidth: 1,
      paddingVertical: 21,
      shadowOffset: {width: 400, height: 400},
      shadowColor: 'black',
      shadowOpacity: 0.9,
      shadowRadius: 10,
    },
    okBtn: {
      marginTop: 24,
      marginBottom: 21,
      width: 280,
      height: 40,
      backgroundColor: '#8EE8BD',
      textAlign: 'center',
      lineHeight: 40,
      color: '#000000',
      fontFamily: 'Poppins-SemiBold',
      borderRadius: 8,
    },
    okBtnDisabled: {
      display: 'none',
    },
  });
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const onDateChange = (date, type) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setSelectedEndDate(moment(date).format('YYYY-MM-DD'));
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(moment(date).format('YYYY-MM-DD'));
    }
  };
  return (
    <View style={styles.container}>
      <CalendarPicker
        width={Dimensions.get('window').width - 40}
        showDayStragglers={true}
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={new Date(2018, 1, 1)}
        maxDate={new Date(2050, 6, 3)}
        weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
        months={[
          'January',
          'Febraury',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]}
        textStyle={{
          fontFamily: 'Poppins-Regular',
          fontSize: 13,
          color: '#000000',
        }}
        customDayHeaderStyles={(dayOfWeek, month, year) => ({
          textStyle: {color: '#EFEFEF', fontFamily: 'Poppins-SemiBold'},
        })}
        dayLabelsWrapper={{
          borderColor: 'transparent',
        }}
        previousTitle="Previous"
        nextTitle="Next"
        monthTitleStyle={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 13,
        }}
        yearTitleStyle={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 13,
        }}
        todayBackgroundColor="transparent"
        todayTextStyle={{
          lineHeight: 30,
          width: 37,
          textAlign: 'center',
          borderRadius: 20,
          color: '#8EE8BD',
          fontFamily: 'Poppins-Bold',
        }}
        selectedDayTextStyle={{
          lineHeight: 30,
          width: 37,
          textAlign: 'center',
          backgroundColor: 'transparent',
        }}
        selectedDayStyle={{
          borderWidth: 2,
        }}
        selectedDayColor="transparent"
        selectedRangeStyle={[
          {
            borderColor: '#8EE8BD',
            lineHeight: 30,
            height: 30,
          },
          new Date(selectedStartDate).getDate() ==
          new Date(selectedEndDate).getDate()
            ? {
                borderColor: '#8EE8BD',
                borderWidth: 2,
                width: 37,
                textAlign: 'center',
                borderRadius: 20,
              }
            : {
                borderTopWidth: 2,
                borderBottomWidth: 2,
              },
        ]}
        selectedRangeStartStyle={{
          borderRightWidth: 0,
          borderLeftWidth: 2,
        }}
        selectedRangeEndStyle={{
          borderRightWidth: 2,
        }}
        scaleFactor={375}
        onDateChange={onDateChange}
      />
      <TouchableOpacity
        onPress={() => {
          if (selectedEndDate) {
            setStartDate(moment(selectedStartDate).format('YYYY-MM-DD'));
            setEndDate(moment(selectedEndDate).format('YYYY-MM-DD'));

            resetValuesHandler();
            setShowCalendar(false);
          }
        }}>
        <Text style={selectedEndDate ? styles.okBtn : styles.okBtnDisabled}>
          okay
        </Text>
      </TouchableOpacity>
    </View>
  );
};
