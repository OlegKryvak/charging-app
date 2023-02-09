import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import VectorIcons from 'react-native-vector-icons/AntDesign';

const failedIcon = (
  <VectorIcons name="closecircle" size={120} color="#FE7C7F" />
);
const successIcon = (
  <VectorIcons name="checkcircle" size={120} color="#2ADA94" />
);

export const PaymentStatus = ({isError, amt, navigation}) => {
  return (
    <View style={styles.container}>
      {isError ? failedIcon : successIcon}
      <Text style={styles.text}>
        {isError
          ? 'Your payment has failed. Any amount debited will be reverted back in 3-5 business days.'
          : `Added ${amt} rs successfully to the wallet.`}
      </Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>{isError ? 'Try again' : 'Okay'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#979797',
    fontSize: 14,
  },
  btnContainer: {
    alignSelf: 'stretch',
  },
  btn: {
    borderRadius: 36,
    backgroundColor: '#000000',
    padding: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    lineHeight: 26,
  },
});
