import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GoBackBtn} from '../../../../components/goBackBtn';
import {SelfTransactions} from '../../../../components/selfTransactions';
import {useRequestYourCredit} from '../../../../hooks/useRequestYourCredit';
import yourCreditService from '../../../../services/yourCreditService';

export const YourCreditPage = () => {
  const [balance, loader, error] = useRequestYourCredit();
  return (
    <View style={styles.pageWrapper}>
      <View style={styles.navContainer}>
        <GoBackBtn title="Your Credit" />

        {loader ? (
          <Text style={{marginLeft: 20}}>Loading</Text>
        ) : (
          <>
            {!error ? (
              <>
                {Object.keys(balance).length !== 0 && (
                  <View style={styles.availableBalance}>
                    <Text style={styles.availableBalanceHeadline}>
                      Available balance :
                    </Text>

                    <Text style={styles.availableBalanceText}>
                      Rs{' '}
                      {balance.creditbalance !== null && balance.creditbalance}
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <Text style={styles.errorMsg}>{error}</Text>
            )}
          </>
        )}
        <Text style={styles.creditTransactions}>Credit transactions</Text>
      </View>
      <SelfTransactions service={yourCreditService} type="credits" />
    </View>
  );
};
const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  navContainer: {
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
  creditTransactions: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#19181A',
    marginTop: 28,
  },
  errorMsg: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 42,
    fontSize: 16,
    color: 'red',
  },
});
