import react from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 109,
    marginBottom: 16,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
  },
  info: {
    width: '50%',
    marginLeft: 17,
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  name: {
    margin: 0,
    marginTop: 16,
    fontFamily: 'Poppins-Regular',
    color: '#19181A',
    fontSize: 16,
    lineHeight: 20,
  },
  infodetails: {
    margin: 0,
    fontFamily: 'Poppins-Regular',
    color: '#979797',
    fontSize: 14,
  },
  date: {
    marginBottom: 16,
    fontFamily: 'Poppins-Light',
    color: '#979797',
    fontSize: 14,
  },
  priceContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  priceTypeContainer: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    fontFamily: 'Poppins-Light',
    color: '#979797',
    fontSize: 14,
    marginRight: 5,
    lineHeight: 20,
  },
  value: {
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
    color: '#19181A',
    fontSize: 16,
    marginRight: 5,
  },
});
