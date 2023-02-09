import React, {useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GoBackBtn} from '../../../components/goBackBtn';
import {styles} from './styles';
import {Alert} from '../../../components/alert';
import {useNavigation} from '@react-navigation/native';
import BatteryCharging from 'react-native-vector-icons/MaterialCommunityIcons';
import {ChargingProccess} from '../../../assets';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export const StartCharging = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const navigation = useNavigation();
  const confirmStopCharging = () => {
    setShowAlert(false);
    navigation.navigate('Finished Charging');
  };

  const ChargingInfo = ({info, address}) => {
    return (
      <View style={styles.chargingInfoContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.chargingInfoText}>Charging</Text>
          <BatteryCharging
            name="battery-charging"
            size={20}
            style={{marginTop: 8, marginLeft: 6}}
            color="#2FFEBA"
            onPress={() => setShowAlert(true)}
          />
        </View>
        <Text style={styles.chargingInfoValue}>{info}</Text>
        <Text style={styles.chargingInfoValue}>{address}</Text>
      </View>
    );
  };
  const Button = ({text, color, buttonHandler}) => {
    return (
      <TouchableOpacity
        onPress={() => buttonHandler()}
        style={[{backgroundColor: color}, styles.button]}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.pageWrapper}>
        <Alert
          setShowAlert={setShowAlert}
          showAlert={showAlert}
          confirm={confirmStopCharging}
          title={'Are you sure  you want to stop charging?'}
          confirmText="Yes, remove"
        />
        <GoBackBtn title="" />
        <View style={styles.container}>
          <Image style={styles.chargingImg} source={charging} />
          <ChargingInfo info="moEVING Hub" address="HSR Layout, Bengaluru" />
          <Text style={styles.hint}>
            You can leave this screen and the vehicle will be charging still.
            Either click on stop charging or simply plug out after done
            charging.
          </Text>
          <Button
            text="Stop Charging"
            color="#E8A98E"
            buttonHandler={() => setShowAlert(true)}
          />
          <Button
            text="Home"
            color="#FFFFFF"
            buttonHandler={() => navigation.navigate('LandingPage')}
          />
        </View>
      </View>
    </ScrollView>
  );
};
