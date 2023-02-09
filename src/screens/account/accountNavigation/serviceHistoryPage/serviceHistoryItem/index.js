import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import moment from 'moment';
import ChargingStation from 'react-native-vector-icons/FontAwesome5';
import ParkingIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
export const ServiceHistoryItem = props => {
  const {
    starttime,
    servicetype,
    usage,
    unit,
    billedamount,
    plandisplayname,
    organisationdisplayname,
  } = props.item;

  const fee =
    billedamount !== null
      ? `Rs ${billedamount} ${usage !== null ? `(${usage}` : ''}${
          unit !== null ? `${unit})` : ''
        }`
      : null;

  const DataFormatter = ({title, value, pos}) => {
    return (
      <View style={pos === 'left' ? styles.columnsLeft : styles.columnsRight}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>
          {value !== null
            ? value.split('')[0].toUpperCase() +
              value.slice(1, value.length).toLowerCase()
            : '--'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.typeAndImageContainer}>
        {servicetype !== null
          ? servicetype.toLowerCase().includes('charging')
            ? chargingStation
            : parkingIcon
          : ''}
        <Text style={styles.servicetype}>
          {servicetype !== null &&
            servicetype &&
            servicetype.split('')[0].toUpperCase() +
              servicetype.slice(1, servicetype.length).toLowerCase()}
        </Text>
      </View>
      <View>
        <View style={styles.row}>
          <DataFormatter title="Plan" value={plandisplayname} pos="left" />
          <DataFormatter
            title="Organisation"
            value={organisationdisplayname}
            pos="right"
          />
        </View>
        <View style={styles.row}>
          <DataFormatter
            title="Date"
            value={
              starttime !== null
                ? moment(starttime).format('DD MMM YYYY')
                : null
            }
            pos="left"
          />
          <DataFormatter title="Fee" value={fee} pos="right" />
        </View>
      </View>
    </View>
  );
};
