import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

const {height, width} = Dimensions.get('window');

export const PlansPopup = ({includes, headline}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const ModalValueItem = ({contraintvalue, type}) => {
    //components is created for rendering all values in contarintvalue types
    return contraintvalue[type].map(item => {
      return (
        <Text key={Math.random()} style={styles.value}>
          {type === 'hub' ? item?.displayname : item}
        </Text>
      );
    });
  };

  return (
    <View style={{position: 'relative'}}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => setModalVisible(false)}
        />
        <View style={styles.modalView}>
          <ScrollView
            style={{height: 180}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'flex-start',
            }}>
            <Text style={styles.headLine}>{headline}</Text>

            {includes[0]?.contraintvalue &&
              ['hub', 'state', 'city'].map(type => {
                //mapping of all availaable types of contraintvalue
                return (
                  <ModalValueItem
                    key={type}
                    type={type}
                    contraintvalue={includes[0]?.contraintvalue}
                  />
                );
              })}
          </ScrollView>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>View Locations</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  modalView: {
    position: 'absolute',
    left: 20,
    top: 250,
    width: width - 40,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'flex-start',
    opacity: 1,
    zIndex: 5,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  headLine: {
    paddingVertical: 8,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    letterSpacing: 0.4,
    color: '#222222',
    textAlign: 'center',
  },
  value: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.4,
    color: '#222222',
    textAlign: 'center',
    paddingVertical: 8,
  },
  textStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.3,
    color: '#AFB1B4',
    lineHeight: 20,
    marginTop: 16,
    marginRight: 8,
  },
});
