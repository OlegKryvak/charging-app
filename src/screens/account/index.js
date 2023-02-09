import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {GoBackBtn} from '../../components/goBackBtn';
import ProfileIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import YourPlanIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ServiceHistoryIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import YourWalletIcon from 'react-native-vector-icons/MaterialIcons';
import YourCreditIcon from 'react-native-vector-icons/MaterialIcons';
import OrganisationManagementIcon from 'react-native-vector-icons/FontAwesome';
import {getUserOrg} from '../../services/chargingService';
import {useDispatch} from 'react-redux';
import {setUserOrgId} from '../../redux/slices/authSlice';

const organisationManagementIcon = (
  <OrganisationManagementIcon name="briefcase" size={25} color="#323232" />
);

const yourCreditIcon = (
  <YourCreditIcon name="credit-card" size={25} color="#323232" />
);

const yourWalletIcon = (
  <YourWalletIcon name="account-balance-wallet" size={25} color="#323232" />
);

const profileIcon = (
  <ProfileIcon name="tooltip-account" size={25} color="#323232" />
);
const yourPlanIcon = <YourPlanIcon name="ticket" size={25} color="#323232" />;
const serviceHistoryIcon = (
  <ServiceHistoryIcon name="history" size={25} color="#323232" />
);

const Account = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getUserOrg().then(res => {
      dispatch(
        setUserOrgId({id: res.data?.organisationdata[0]?.organisationid}),
      );
    });
  }, [dispatch]);
  const navigation = useNavigation();
  const handleNavigate = title => {
    navigation.navigate(title);
  };
  const NavigationItem = ({title, logo}) => {
    return (
      <TouchableOpacity
        onPress={() => handleNavigate(title)}
        style={styles.navigationItemWrapper}>
        <View style={styles.imageContainer}>{logo}</View>
        <View style={styles.textContainer}>
          <Text style={styles.accountBtns}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.pageWrapper}>
      <GoBackBtn title="Account" />
      <View style={styles.navContainer}>
        <NavigationItem title={'Profile'} logo={profileIcon} />
        <NavigationItem title={'Your Plan'} logo={yourPlanIcon} />
        <NavigationItem title={'Service history'} logo={serviceHistoryIcon} />
        <NavigationItem title={'Your Wallet'} logo={yourWalletIcon} />
        <NavigationItem title={'Your Credit'} logo={yourCreditIcon} />
        <NavigationItem
          title={'Organisation Management'}
          logo={organisationManagementIcon}
        />
      </View>
    </View>
  );
};
export default Account;
