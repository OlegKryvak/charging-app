import React from 'react';
import {Text, View} from 'react-native';
import {GoBackBtn} from '../../../components/goBackBtn';
import {Station} from './station';
import {styles} from './styles';

const hardCodedData = [
  {
    id: 0,
    address: 'HSR Layout, Bengaluru,',
    available: 2,
    total: 4,
  },
  {
    id: 1,
    address: 'HSR Layout, Bengaluru,',
    available: 2,
    total: 4,
  },
];

export const ChargingStations = () => {
  return (
    <View style={styles.pageWrapper}>
      <GoBackBtn title="Charging Stations" />
      <Text style={styles.availableStations}>3 stations available nearby</Text>
      {hardCodedData.map(station => {
        return <Station key={station.id} station={station} />;
      })}
    </View>
  );
};
