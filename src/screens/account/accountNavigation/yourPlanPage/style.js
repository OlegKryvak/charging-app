import react from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  yourPlanPageWrapper: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 24,
    // height: '100%',
    //made background color for all screen
  },
  goBackBtnContainer: {
    paddingBottom: 39,
  },
  yourPlanContainer: {
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    height: 'auto',
  },
  organisationWrapper: {
    width: '100%',
    paddingHorizontal: 23,
    paddingVertical: 12,
  },
  organisationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  organisationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#979797',
  },
  superPlanText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#19181A',
  },
  viewBtn: {
    fontFamily: 'Poppins-Medium',
    color: '#0091FF',
    fontSize: 14,
  },
  loader: {
    fontFamily: 'Poppins-Medium',
    color: 'grey',
    fontSize: 20,
    textAlign: 'center',
  },
  error: {
    fontFamily: 'Poppins-Medium',
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  noData: {
    fontFamily: 'Poppins-Medium',
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 20,
  },
});
