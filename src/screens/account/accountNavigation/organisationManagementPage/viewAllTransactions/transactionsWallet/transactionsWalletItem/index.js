import React from 'react';
import {Text, View} from 'react-native';
import Arrow from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import moment from 'moment';
export const TransactionsWalletItem = props => {
  const {identifier, starttime, servicetype, unit, billedamount, issuccessful} =
    props.item;
  const arrow = (
    <Arrow
      name="arrow-up-circle"
      size={30}
      color="#B59BFF"
      style={{
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
          {servicetype && (
            <Text style={styles.type}>
              {servicetype.split('')[0].toUpperCase() +
                servicetype.slice(1, servicetype.length).toLowerCase()}
            </Text>
          )}
        </View>
        <Text style={styles.value}>{`Rs ${billedamount}`}</Text>
      </View>
    </View>
  );
};
