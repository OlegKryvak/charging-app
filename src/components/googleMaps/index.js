import React from 'react';
import {View, Text} from 'react-native';
import MapView from 'react-native-maps';
import {styles} from './style';
import ChargeIcon from 'react-native-vector-icons/FontAwesome5';

const chargingIcon = (
  <ChargeIcon name="charging-station" size={20} color="#000000" />
);

const GoogleMaps = () => {
  return (
    <View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>

      <View style={styles.batteryContainer}>
        {chargingIcon}
        <Text style={styles.nearbyStationsText}>
          Nearby {`${'\n'}`}Charging stations
        </Text>
      </View>
    </View>
  );
};
export default GoogleMaps;
