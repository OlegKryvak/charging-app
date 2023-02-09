import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles.js';
import ChargingStation from 'react-native-vector-icons/FontAwesome5';
import ParkingIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import moment from 'moment';
const chargingStation = (
  <ChargingStation
    name="charging-station"
    size={20}
    color="#8EE8BD"
    style={{
      marginRight: 5,
      width: 30,
      height: 30,
      backgroundColor: 'white',
      borderRadius: 50,
      paddingLeft: 6,
      paddingTop: 3,
    }}
  />
);
const parkingIcon = (
  <ParkingIcon
    name="parking"
    size={30}
    color="#EB6A6A"
    style={{
      marginRight: 5,
      width: 30,
      height: 30,
      backgroundColor: 'white',
      borderRadius: 50,
    }}
  />
);
export const TransactionsServicesItem = props => {
  const {identifier, starttime, servicetype, unit, billedamount, usage} =
    props.item;

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View>
          <Text style={styles.name}>{identifier}</Text>
        </View>
        {starttime && (
          <Text style={styles.date}>
            {moment(starttime).format('DD MMM YYYY')}
          </Text>
        )}
      </View>
      <View style={styles.priceContainer}>
        {servicetype && (
          <View style={styles.priceTypeContainer}>
            {servicetype.toLowerCase().includes('charging')
              ? chargingStation
              : parkingIcon}
            <Text style={styles.type}>
              {servicetype.split('')[0].toUpperCase() +
                servicetype.slice(1, servicetype.length).toLowerCase()}
            </Text>
          </View>
        )}
        <Text style={styles.value}>
          {billedamount ? `Rs ${billedamount}` : ''}
          {' ('}
          {usage ? `${usage} ` : ''}
          {unit &&
            `${
              unit.split('')[0].toUpperCase() +
              unit.slice(1, unit.length).toLowerCase()
            }`}
          {')'}
        </Text>
      </View>
    </View>
  );
};
