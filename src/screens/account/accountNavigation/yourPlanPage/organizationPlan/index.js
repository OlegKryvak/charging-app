import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Dimensions} from 'react-native';
import SelectYourState from '../../../../../components/selectYourState';
import {GoBackBtn} from '../../../../../components/goBackBtn';
import {PlanStateInfo} from '../../../../../components/PlanStateInfo';
import planService from '../../../../../services/planService';

import {styles} from './style';
import {useSelector} from 'react-redux';
import CloseIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const closeIcon = (
  <CloseIcon name="close" size={25} color="#323232" style={{marginRight: 20}} />
);

export const OrganizationPlan = ({route}) => {
  const [plans, setPlans] = useState(null);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(true);
  const [isBackground, setIsBackground] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const {navHeadline, planId, organisationId} = route.params;
  const states = useSelector(({plans}) => plans.stateTypes);
  useEffect(() => {
    setLoader(true);
    planService
      .getAllOrganizationPlan(selectedState)
      .then(res => {
        res.data.forEach(organisation => {
          if (organisation.id === organisationId) {
            organisation?.userplans.map(plan => {
              if (plan.id === planId) {
                setPlans(plan);
              }
            });
          }
        });
      })
      .catch(error => {
        setError(
          error.response.data?.message
            ? error.response.data?.message
            : error.response.data?.detail,
        );
      })
      .finally(() => {
        setLoader(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);
  return (
    <View style={styles.yourPlanPageWrapper}>
      {!isBackground && <GoBackBtn headline={navHeadline} />}
      {isBackground && (
        <View style={styles.closeIconContainer}>{closeIcon}</View>
      )}

      <View style={styles.SelectYourStateContainer}>
        <SelectYourState
          states={states}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          isBackground={isBackground}
          setIsBackground={setIsBackground}
        />
      </View>
      {loader ? (
        <Text style={styles.loader}>Loading</Text>
      ) : (
        <>
          {!error ? (
            <>
              {!selectedState ? ( //if there is no selected state we show all available states
                <ScrollView
                  style={{height: Dimensions.get('window').height - 250}}>
                  {states
                    .map(state => state.title)
                    .map((state, index) => {
                      return (
                        <PlanStateInfo
                          key={state}
                          isLine={index < states.length - 1}
                          state={state}
                          plan={plans}
                        />
                      );
                    })}
                </ScrollView>
              ) : (
                //if there is selected state we show it
                <PlanStateInfo
                  isLine={false}
                  state={selectedState}
                  plan={plans}
                />
              )}
            </>
          ) : (
            <Text style={styles.error}>{error}</Text>
          )}
        </>
      )}
    </View>
  );
};
