import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  organisationmanagementWrapper: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    paddingHorizontal: 20,
    flex: 1,
  },
  organisationManagementContainer: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginTop: 36,
    borderRadius: 20,
  },
  organisationmanagementTitle: {
    margin: 0,
    color: '#19181A',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  standartPlanContainer: {
    flexDirection: 'row',
  },
  viewBtn: {
    color: '#0091FF',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  standartPlanText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#19181A',
    lineHeight: 20,
  },
  walletBalanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletBalanceText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#19181A',
  },
  cardItemContainer: {
    flexDirection: 'row',
    paddingTop: 32,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  error: {
    fontFamily: 'Poppins-Medium',
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
