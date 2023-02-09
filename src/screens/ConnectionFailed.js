import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ConnectionFailedSvg} from '../assets';
import Info from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

export const ConnectionFailed = () => {
  // state variable
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Connection Failed</Text>
      <View style={styles.connectionFailedSvg}>
        <ConnectionFailedSvg />
      </View>
      <View style={styles.hint}>
        <Info name="info" size={24} color="#30C061" />
        <Text style={styles.hintText}>
          You can unplug your vehicle in case of any{' '}
          <Text style={styles.hintTextBold}>Powercut or disconnection.</Text>
          The amount will be deducted from the wallet, once the charger is
          connected back to the wifi
        </Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('LandingPage')}>
        <Text style={styles.btnText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    paddingTop: 34,
    paddingHorizontal: 30,
  },
  connectionFailedSvg: {
    width: '100%',
    aspectRatio: 1,
    marginTop: 24,
    alignItems: 'center',
  },
  headline: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#E54545',
  },
  hint: {
    marginTop: 20,
    borderColor: '#0000001F',
    borderWidth: 1,
    padding: 16,
    borderRadius: 4,
    width: '100%',
    flexDirection: 'row',
  },
  hintText: {
    color: '#898989',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginHorizontal: 16,
  },
  hintTextBold: {
    color: '#494949',
    fontFamily: 'Poppins-SemiBold',
  },
  btn: {
    backgroundColor: '#000000',
    paddingVertical: 19,
    position: 'absolute',
    bottom: 46,
    width: '100%',
    borderRadius: 36,
  },
  btnText: {
    color: '#ffffff',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 16,
  },
});
