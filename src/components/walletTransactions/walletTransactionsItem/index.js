import React from 'react';
import {Text, View} from 'react-native';
import Arrow from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import moment from 'moment';
export const WalletTransactionsItem = props => {
  const {identifier, starttime, servicetype, unit, billedamount, issuccessful} =
    props.item;
  const arrow = (
    <Arrow
      name="arrow-up-circle"
      size={30}
      color="#B59BFF"
      style={{
        marginRight: 5,
        transform: [{rotate: issuccessful ? '-45deg' : '135deg'}],
      }}
    />
  );

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
        <View style={styles.priceTypeContainer}>
          {arrow}
          <Text style={styles.type}>
            {servicetype.split('')[0].toUpperCase() +
              servicetype.slice(1, servicetype.length).toLowerCase()}
          </Text>
        </View>
        <Text style={styles.value}>{`${
          unit.split('')[0].toUpperCase() +
          unit.slice(1, unit.length).toLowerCase()
        }. ${billedamount}`}</Text>
      </View>
    </View>
  );
};
