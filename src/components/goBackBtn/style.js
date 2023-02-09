import react from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yourPlanText: {
    paddingLeft: 12,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#000000',
  },
});
