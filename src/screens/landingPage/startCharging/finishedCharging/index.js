import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {FinishedChargingInfo} from './finishedChargingInfo';
import {FinishedCharging} from '../../../../assets';

export const FInishedCharging = () => {
  return (
    <View style={styles.pageWrapper}>
      <View style={styles.finishedContainer}>
        <FinishedCharging style={{marginBottom: 16}} />
        <Text style={styles.finishedText}>Finished Charging</Text>
        <Text style={styles.unpluggedText}>Unplugged! Ride safe</Text>
      </View>

      <FinishedChargingInfo />
    </View>
  );
};
