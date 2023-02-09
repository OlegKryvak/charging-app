import react from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  serviceTransactionsWrapper: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    flex: 1,
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  filterIconContainer: {
    position: 'relative',
  },
  filterActive: {
    position: 'absolute',
    top: -2,
    left: 10,
    width: 16,
    height: 16,
    backgroundColor: '#0091FF',
    zIndex: 6,
    borderRadius: 50,
  },
  error: {
    fontFamily: 'Poppins-Medium',
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  noData: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 42,
    fontSize: 16,
    color: 'green',
  },
});
