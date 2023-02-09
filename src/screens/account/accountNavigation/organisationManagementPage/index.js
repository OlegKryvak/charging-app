import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {CardItem} from '../../../../components/cardItem';
import {GoBackBtn} from '../../../../components/goBackBtn';
import UsersIcon from 'react-native-vector-icons/FontAwesome5';
import AllTransactionsIcon from 'react-native-vector-icons/Entypo';
import WaleltIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import organisationService from '../../../../services/orgManagementService';
import {styles} from './style';
import {useDispatch} from 'react-redux';
import {setOrganisationId} from '../../../../redux/slices/transactionsSlice';

const usersIcon = <UsersIcon name="user-friends" size={20} color="#000000" />;
const allTransactionsIcon = (
  <AllTransactionsIcon name="back-in-time" size={20} color="#000000" />
);
const walletIcon = <WaleltIcon name="wallet" size={22} color="#000000" />;

export const OrganisationManagementPage = () => {
  const isFocused = useIsFocused();

  const [organisations, setOrganisations] = useState([]);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const loadOrgData = () => {
      organisationService
        .getOrganisationInfo()
        .then(res => {
          res.data.forEach(element => {
            dispatch(setOrganisationId({organisationId: element.id}));
          });
          setOrganisations(res.data);
        })
        .catch(error => {
          if (error.response.status === 500) {
            setError('Failed to load data. Please try again later');
          } else {
            setError(
              error.response.data?.message
                ? error.response.data?.message
                : error.response.data?.detail,
            );
          }
        });
    };

    isFocused && loadOrgData();
  }, [isFocused, dispatch]);

  return (
    <ScrollView style={styles.organisationmanagementWrapper}>
      <GoBackBtn title="Organisation Management" />

      {!error ? (
        <>
          {organisations.length > 0 &&
            organisations.map(organisation => {
              return (
                <View
                  style={styles.organisationManagementContainer}
                  key={organisation.id}>
                  <Text style={styles.organisationmanagementTitle}>
                    {organisation?.displayname}
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      width: 75,
                      marginVertical: 16,
                      borderColor: '#D1D1D1',
                    }}
                  />
                  <View style={styles.walletBalanceContainer}>
                    <Text style={styles.walletBalanceText}>
                      Available Credits :
                    </Text>
                    <Text style={styles.walletBalanceText}>
                      Rs.{' '}
                      {organisation?.creditbalance
                        ? organisation?.creditbalance
                        : 0}
                    </Text>
                  </View>
                  <View style={styles.walletBalanceContainer}>
                    <Text style={styles.walletBalanceText}>
                      Wallet Balance :
                    </Text>
                    <Text style={styles.walletBalanceText}>
                      Rs.{' '}
                      {organisation?.walletbalance
                        ? organisation?.walletbalance
                        : 0}
                    </Text>
                  </View>
                </View>
              );
            })}
        </>
      ) : (
        <Text style={styles.error}>{error}</Text>
      )}

      <View style={styles.cardItemContainer}>
        <CardItem title="Manage users" color="#D6C8FF" icon={usersIcon} />
        <CardItem
          title="View all transactions"
          color="#D2EAFE"
          icon={allTransactionsIcon}
        />
        <CardItem
          isOrgWallet={true}
          walletBalance={
            organisations.length ? organisations[0].walletbalance : 0
          }
          title="Add money to org wallet"
          color="#FFD9C9"
          icon={walletIcon}
        />
        <CardItem title="Usage Limit" color="#FDF8F2" icon={walletIcon} />
      </View>
    </ScrollView>
  );
};
