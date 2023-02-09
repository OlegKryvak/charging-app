import react from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 109,
    marginBottom: 16,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 18,
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
  },
  transactionType: {
    margin: 0,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    fontSize: 16,
    lineHeight: 20,
  },
  serviceType: {
    margin: 0,
    fontFamily: 'Poppins-Regular',
    color: '#979797',
    fontSize: 14,
    lineHeight: 16,
  },
  value: {
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    fontSize: 16,
  },
  date: {
    marginBottom: 16,
    fontFamily: 'Poppins-Light',
    color: '#979797',
    fontSize: 14,
  },
});
