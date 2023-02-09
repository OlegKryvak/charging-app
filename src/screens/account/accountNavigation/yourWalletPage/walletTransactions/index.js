import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GoBackBtn} from '../../../../../components/goBackBtn';
import {SelfTransactions} from '../../../../../components/selfTransactions';
import yourWalletService from '../../../../../services/yourWalletService';

export const WalletTransactions = () => {
  return (
    <View style={styles.pageWrapper}>
      <View style={styles.navContainer}>
        <GoBackBtn title="Your Wallet" />
      </View>
      <SelfTransactions service={yourWalletService} type="wallet" />
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
});
