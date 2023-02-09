import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from './style';
import {GoBackBtn} from '../../../../components/goBackBtn';
import {CardItem} from '../../../../components/cardItem';
//import icons
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useRequestYourWallet} from '../../../../hooks/useRequestYourWallet';

const wallet = <Icon name="account-balance-wallet" size={25} color="#323232" />;
const history = <Icon name="history" size={25} color="#323232" />;

export const YourWalletPage = () => {
  const [balance, loader, error] = useRequestYourWallet();
  return (
    <View style={styles.yourWalletPageWrapper}>
      <GoBackBtn title="Your Wallet" />
      {!loader ? (
        <View>
          {!error ? (
            <>
              {Object.keys(balance).length !== 0 && (
                <View style={styles.availableBalance}>
                  <Text style={styles.availableBalanceHeadline}>
                    Available balance :
                  </Text>

                  <Text style={styles.availableBalanceText}>
                    Rs {balance.walletbalance !== null && balance.walletbalance}
                  </Text>
                </View>
              )}
            </>
          ) : (
            <Text style={styles.errorMsg}>{error}</Text>
          )}

          <View style={styles.cardItemContainer}>
            <CardItem
              isOrgWallet={false}
              title="Add money to wallet"
              color="#FFD9C9"
              icon={wallet}
            />
            <CardItem
              title="Wallet transactions"
              color="#D2EAFE"
              icon={history}
            />
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};
