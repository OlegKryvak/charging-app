import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  error: {
    width: Dimensions.get('window').width - 40,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 42,
    fontSize: 16,
    color: 'red',
  },
  noData: {
    width: Dimensions.get('window').width - 40,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 42,
    fontSize: 16,
    color: 'green',
  },
});
