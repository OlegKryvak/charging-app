import React from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Location from 'react-native-vector-icons/Ionicons';

export const Station = ({station}) => {
  const {address, available, total} = station;
  const googleMapOpener = (lat = 47.807862, lng = 12.964075) => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lng}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          googleMapOpener();
        }}
        style={styles.map}>
        <Location
          name="location-sharp"
          size={30}
          color="#0091FF"
          style={{
            marginBottom: 10,
          }}
        />
        <Text
          style={{
            color: '#0091FF',
            fontSize: 10,
            fontFamily: 'Poppins-Medium',
          }}>
          view directions
        </Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.address}>{address}</Text>
        <View style={styles.info}>
          <View>
            <Text style={styles.title}>Available</Text>
            <Text style={styles.available}>
              {available < 10 ? '0' + available : available}
            </Text>
          </View>
          <View>
            <Text style={styles.title}>Total </Text>
            <Text style={styles.total}>{total < 10 ? '0' + total : total}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 11,
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  map: {
    backgroundColor: 'white',
    height: 89,
    width: 97,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 12,
  },
  info: {
    width: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  address: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#19181A',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#AFB1B4',
    marginTop: 7,
    marginBottom: 3,
  },
  available: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#11C660',
  },
  total: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#19181A',
  },
});
