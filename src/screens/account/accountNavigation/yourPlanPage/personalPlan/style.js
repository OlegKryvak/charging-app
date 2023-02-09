import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  close: {},
  yourPlanPageWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  SelectYourStateContainer: {
    paddingTop: 31,
    paddingBottom: 32,
  },
  closeIconContainer: {
    alignItems: 'flex-end',
    paddingTop: 33,
    paddingLeft: 33,
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
});
