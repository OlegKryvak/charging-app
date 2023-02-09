import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const CardItem = ({color, title, icon, isOrgWallet, walletBalance}) => {
  const styles = StyleSheet.create({
    container: {
      width: '48%',
      backgroundColor: color,
      borderRadius: 24,
      paddingHorizontal: 18,
      paddingBottom: 6,
      paddingTop: 19,
      marginBottom: 14,
    },
    text: {
      width: 106,
      marginTop: 12,
      fontFamily: 'Poppins-Medium',
      fontSize: 16,
      lineHeight: 30,
      color: '#19181A',
    },
  });
  const navigation = useNavigation();
  const handleNavigate = title => {
    if (title === 'Add money to org wallet') {
      navigation.navigate(title, {
        isOrgWallet,
        walletBalance,
      });
    } else {
      navigation.navigate(title);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => handleNavigate(title)}
      style={styles.container}>
      <View>
        {icon}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
