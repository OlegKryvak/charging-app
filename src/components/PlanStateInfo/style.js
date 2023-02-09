import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  stateTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    letterSpacing: 0.3,
    color: '#19181A',
    lineHeight: 20,
  },
  includesValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewLocations: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.3,
    color: '#AFB1B4',
    lineHeight: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.3,
    color: '#AFB1B4',
    lineHeight: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  value: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.3,
    color: '#19181A',
    lineHeight: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  divider: {
    marginHorizontal: 16,
    width: 2,
    height: 20,
    backgroundColor: '#D1D1D1',
    marginTop: 2,
  },
  isNotSelectedState: {
    //style for text which displayed if state hasn't plan
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    letterSpacing: 0.3,
    color: '#19181A',
    lineHeight: 20,
  },
});

export default styles;
