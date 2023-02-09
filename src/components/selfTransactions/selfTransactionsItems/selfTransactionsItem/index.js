import React from 'react';
import {Text, View} from 'react-native';
import Arrow from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import moment from 'moment';
export const SelfTransactionsItem = props => {
  const {starttime, servicetype, transactiontype, billedamount} = props.item;
  const arrow =
    transactiontype !== null ? (
      <Arrow
        name="arrow-up-circle"
        size={38}
        color="#B59BFF"
        style={{
          marginRight: 5,
          transform: [
            {
              rotate:
                transactiontype === 'serviceusage' ||
                transactiontype === 'planrenewal'
                  ? '45deg'
                  : '-135deg',
            },
          ],
        }}
      />
    ) : null;
  const transactionType =
    transactiontype !== null
      ? transactiontype === 'serviceusage' || transactiontype === 'serviceusage'
        ? 'Paid'
        : 'Received'
      : null;
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.typeContainer}>
          {arrow !== null && arrow}
          <View style={{justifyContent: 'center'}}>
            {transactionType !== null && (
              <Text style={styles.transactionType}>{transactionType}</Text>
            )}
            {servicetype !== null && (
              <Text style={styles.serviceType}>
                {servicetype.split('')[0].toUpperCase() +
                  servicetype.slice(1, servicetype.length).toLowerCase()}
              </Text>
            )}
          </View>
        </View>
        <Text style={styles.value}>{`Rs. ${billedamount}`}</Text>
      </View>
      <Text>
        {starttime && (
          <Text style={styles.date}>
            {moment(starttime).format('DD MMM YYYY')}
          </Text>
        )}
      </Text>
    </View>
  );
};
