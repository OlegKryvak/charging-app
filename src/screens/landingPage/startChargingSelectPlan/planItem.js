import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const PlanItem = ({plan, title, setActiveItem, isActive, id, type}) => {
  const {displayname} = plan;
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      borderColor: isActive ? '#39B54A' : '#F6F6F6',
      borderWidth: 6,
      borderRadius: 20,
      paddingTop: 21,
      paddingBottom: 26,
      paddingLeft: 9,
      paddingRight: 20,
      marginVertical: 17,
    },
    title: {
      color: '#19181A',
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
    },
    paymentContainer: {
      marginTop: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    changePayment: {
      color: '#0091FF',
      fontFamily: 'Poppins-Medium',
      fontSize: 14,
      opacity: isActive ? 1 : 0.5,
    },
    type: {
      color: '#979797',
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
    },
  });
  const changePayment = () => {
    type === 'org' && isActive && navigation.navigate('Select payment');
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setActiveItem(id)}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.paymentContainer}>
        <Text style={styles.type}>Credit</Text>
        {type === 'org' && (
          <TouchableOpacity
            style={{position: 'relative', zIndex: 5}}
            onPress={() => changePayment()}>
            <Text style={styles.changePayment}>Change payment</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};
