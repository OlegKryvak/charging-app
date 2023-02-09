import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {DotIndicator} from 'react-native-indicators';
import {GoBackBtn} from '../../../../../components/goBackBtn';
import {PaymentStatus} from './PaymentStatus';
import RazorpayCheckout from 'react-native-razorpay';
import {useRequestYourWallet} from '../../../../../hooks/useRequestYourWallet';
import * as Sentry from '@sentry/react-native';
// import services
import yourWalletService from '../../../../../services/yourWalletService';
// import styles
import {styles} from './style';

export const AddMoneyToOrgWallet = ({navigation, route}) => {
  if (!route.params) {
    route.params = {};
  }
  const {isOrgWallet, walletBalance} = route.params;
  const [balance, loader, error] = useRequestYourWallet();
  const [number, setNumber] = useState();
  const [show, setShow] = useState(false);
  const [isError, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const organisationId = useSelector(
    ({transactions}) => transactions.organisationId,
  );

  const handlePayment = () => {
    let orgId = organisationId;

    if (!isOrgWallet) {
      orgId = null;
    }
    yourWalletService
      .createOrder(number, orgId)
      .then(res => {
        setLoading(true);
        const {orderid, amount} = res.data;
        if (orderid && amount) {
          var options = {
            description: 'Payment Fees',
            image:
              'https://www.moeving.com/wp-content/uploads/2022/02/logo-1-2048x547.png',
            currency: 'INR',
            key: 'rzp_test_B9C3Mom705QOmY',
            amount: amount,
            name: 'MoEVing',
            order_id: orderid,
            theme: {color: '#53a20e'},
          };

          RazorpayCheckout.open(options)
            .then(data => {
              const {
                razorpay_payment_id: paymentId,
                razorpay_order_id: orderId,
                razorpay_signature: signature,
              } = data;

              yourWalletService
                .getRechargeStatus(paymentId, orderId, signature, orgId)
                .then(response => {
                  setShow(true);
                  setLoading(false);
                })
                .catch(err1 => {
                  console.log('error mmatch move');
                  setError(true);
                  setShow(true);
                  setLoading(false);
                  Sentry.captureException(err1);
                });
            })
            .catch(err2 => {
              Sentry.captureException(err2);
              setError(true);
              setShow(true);
              setLoading(false);
            });
        } else {
          Alert.alert('Failed to get OrderId or Amount');
          setLoading(false);
        }
      })
      .catch(err => Sentry.captureException(err));
  };

  return (
    <View style={styles.wrapper}>
      <GoBackBtn
        title={'Add money to ' + (isOrgWallet ? 'org wallet' : 'wallet')}
      />
      {loading ? (
        <DotIndicator color="blue" />
      ) : (
        <View style={styles.content}>
          {!show && (
            <View style={styles.container}>
              <View style={styles.amountContainer}>
                <View>
                  <Text style={styles.heading}>
                    Enter the amount to be added
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.currency}>
                    <Text style={styles.currencyText}>Rs. </Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={e => setNumber(e)}
                    value={number}
                    placeholder="0000"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.line} />
              </View>

              <View style={styles.currentContainer}>
                <Text style={styles.balance}>
                  Current Balance: Rs. {console.log(walletBalance, isOrgWallet)}
                  {isOrgWallet ? walletBalance : balance.walletbalance}
                </Text>
                <Text style={styles.balanceText}>
                  You will be directed to a different page for payment gateway.
                  Please be assured you will be re-directed here again once the
                  payment is processed.
                </Text>
              </View>

              <View>
                <TouchableOpacity style={styles.btn} onPress={handlePayment}>
                  <Text style={styles.btnText}>Pay now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {/* End of container */}
          {show && (
            <PaymentStatus
              isError={isError}
              amt={number}
              navigation={navigation}
            />
          )}
        </View>
      )}
      {/* End of content */}
    </View> // End of wrapper
  );
};
