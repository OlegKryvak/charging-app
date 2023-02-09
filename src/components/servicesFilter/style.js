import react from 'react';
import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  iconDone: {
    fontFamily: 'Poppins-Medium',
    color: '#0091FF',
    fontSize: 14,
    marginRight: 37,
  },
  services: {
    marginTop: 43,
    marginBottom: 32,
  },
  servicesText: {
    fontFamily: 'Poppins-Medium',
    color: '#19181A',
    fontSize: 16,
    marginLeft: 10,
  },
  transactionsContainer: {},
  showMoreBtn: {
    fontFamily: 'Poppins-Regular',
    color: '#0091FF',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
  },
  error: {
    width: Dimensions.get('window').width - 48,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 42,
    fontSize: 16,
    color: 'red',
  },
  noData: {
    fontFamily: 'Poppins-Regular',
    color: 'green',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    lineHeight: 200,
    textAlign: 'center',
    width: Dimensions.get('window').width - 48,
  },
});

export default styles;
