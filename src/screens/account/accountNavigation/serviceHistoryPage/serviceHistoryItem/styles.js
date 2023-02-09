import react from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 14,
    justifyContent: 'space-between',
  },
  typeAndImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingLeft: 15,
  },
  servicetype: {
    fontFamily: 'Poppins-Regular',
    color: '#4F4F4F',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingVertical: 6,
  },
  columnsLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '35%',
  },
  columnsRight: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '35%',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    color: '#666666',
    fontSize: 14,
  },
  value: {
    fontFamily: 'Poppins-Medium',
    color: '#222222',
    fontSize: 16,
  },
});
