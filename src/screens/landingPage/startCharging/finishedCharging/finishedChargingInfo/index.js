import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';

export const FinishedChargingInfo = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Rs. 60</Text>
        <Text style={styles.subtitle}>Debited from wallet</Text>
        <Text style={styles.distanceInfo}>10 Kw | 30 mins charged</Text>
        <Text style={styles.planInfo}>Standart plan</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LandingPage')}>
          <Text style={styles.textButton}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
