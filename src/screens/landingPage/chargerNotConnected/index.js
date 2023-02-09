import React, {useState} from 'react';
import ChargingStation from 'react-native-vector-icons/FontAwesome5';
import Info from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import NotConnectedImg from '../../../assets/img/NotConnected.png';
export const ChargerNotConnected = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.headline}>
        <Text style={styles.headlineText}>Charger Not Connected </Text>
        <ChargingStation
          name="charging-station"
          size={20}
          color="#E54545"
          style={{marginLeft: 12}}
        />
      </View>
      <Image source={NotConnectedImg} style={styles.notConnectedImg} />
      <View style={styles.hint}>
        <Info name="info" size={24} color="#30C061" />
        <Text style={styles.hintText}>
          Please <Text style={styles.hintTextBold}>Connect the Charger</Text> to
          your vehicle and then proceed for charging
        </Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    position: 'relative',
  },
  headline: {
    marginTop: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headlineText: {
    color: '#E54545',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    textAlign: 'center',
  },
  notConnectedImg: {
    marginTop: 52,
  },
  hint: {
    marginTop: 64,
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
    textAlign: 'left',
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
    bottom: 70,
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
