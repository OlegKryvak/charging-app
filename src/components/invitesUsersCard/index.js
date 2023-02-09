import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';
import moment from 'moment';

export const InvitesUsersCard = ({item}) => {
  const date = moment(item.created_date, moment.ISO_8601);
  const createdDate = date.format('DD MMM YYYY');

  return (
    <>
      <View style={styles.cardsContainer}>
        <View style={styles.cardContainer}>
          <View>
            <Text style={styles.name}>{item.identifier}</Text>
            <Text style={styles.activeDate}>{createdDate}</Text>
          </View>
          <View>
            <Text style={item.issuspended ? styles.deleted : styles.added}>
              {item.issuspended ? 'Deleted' : 'Added'}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};
