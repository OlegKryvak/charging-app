import React, {useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
//Add Services
import authService from '../../services/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setToken} from '../../redux/slices/authSlice';
import {CardItem} from '../../components/cardItem';
import GoogleMaps from '../../components/googleMaps';
import QrCode from 'react-native-vector-icons/Ionicons';
import Gears from 'react-native-vector-icons/FontAwesome';
import LogoutIcon from 'react-native-vector-icons/AntDesign';
import {setOrganisationId} from '../../redux/slices/transactionsSlice';
import organisationService from '../../services/orgManagementService';
import {MoevingLogo, MoevingLogoSmall, QrCodeSmall, Tesla} from '../../assets';

const logoutIcon = <LogoutIcon name="logout" size={25} color="#323232" />;

const gearsIcon = (
  <Gears name="gears" size={20} color="#000000" style={{paddingBottom: 8}} />
);
const qrCodeIcon = (
  <QrCode name="qr-code" size={20} color="#323232" style={{paddingLeft: 5}} />
);

function LandingPage({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getToken = async () => {
    return await AsyncStorage.getItem('@access_token');
  };
  //Set token to async storage
  useEffect(() => {
    organisationService.getOrganisationInfo().then(res => {
      res.data.forEach(element => {
        dispatch(setOrganisationId({organisationId: element.id}));
      });
    });
    getToken().then(token => {
      console.log('tt', token);
      dispatch(setToken(token));
    });
  });

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const msg = error.response.data?.message;
        if (status === 401 && msg === 'User Successfully Logged Out') {
          //firebase logout
          if (auth().currentUser) {
            await auth().signOut();
          }

          AsyncStorage.removeItem('@access_token');
          navigation.navigate('Login');
        } else {
          Alert.alert('Logout process failed');
        }
      } else {
        Alert.alert('Logout failed!');
      }
      AsyncStorage.removeItem('@access_token');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerImageContainer}>
          <MoevingLogo />
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          {logoutIcon}
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <MoevingLogoSmall />
          <QrCodeSmall />
        </View>
        <Text style={styles.moevinghubText}>At a moEVing hub?</Text>
        <View style={styles.textBtnContainer}>
          <Text style={styles.chargeVehicleText}>Charge your vehicle now</Text>
          <TouchableWithoutFeedback>
            <View style={styles.headerBtn}>
              <Text style={styles.startChargingText}>Start charging</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Start Charging Select Plan')}>
        <Text>Start Charging Select Plan</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Select the slot')}>
        <Text>Select the slot</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Charging Stations')}>
        <GoogleMaps />
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <CardItem
          color="#D6C8FF"
          title="Maintance and Service"
          icon={gearsIcon}
        />
        <TouchableOpacity>
          <View style={styles.yourEvContainer}>
            <Text style={styles.isntIttheRightTimeText}>
              isn’t it the right time ?
            </Text>
            <Text style={styles.getYourEvNowText}>Get your EV now!!</Text>
            <View style={styles.teslaContainer}>
              <Tesla />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default LandingPage;
