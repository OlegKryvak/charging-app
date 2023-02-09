import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  yourWalletPageWrapper: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 20,
  },
  availableBalance: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#F6F6F6',
    marginTop: 35,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  availableBalanceHeadline: {
    margin: 0,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#000000',
  },
  availableBalanceText: {
    margin: 0,
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
    color: '#000000',
  },
  cardItemContainer: {
    marginTop: 29,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  errorMsg: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 42,
    fontSize: 16,
    color: 'red',
  },
});
