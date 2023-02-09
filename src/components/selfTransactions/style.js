import react from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    paddingHorizontal: 20,
    flex: 1,
  },
  container: {},
  transactionsContainer: {
    height: Dimensions.get('window').height - 130,
  },
  error: {
    fontFamily: 'Poppins-Medium',
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
