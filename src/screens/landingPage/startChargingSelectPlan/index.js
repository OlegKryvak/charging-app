import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {GoBackBtn} from '../../../components/goBackBtn';
import {styles} from './styles';
import planService from '../../../services/planService';
import {useNavigation} from '@react-navigation/native';
import {useRequestStartChargingSelectPlan} from '../../../hooks/useRequestStartChargingSelectPlan';
import {PlanItem} from './planItem';

export const StartChargingSelectPlan = () => {
  const [activeItem, setActiveItem] = useState('');
  //got data for plans
  const [allOrganisationPlans, orgLoader, orgError] =
    useRequestStartChargingSelectPlan(planService.getAllOrganizationPlan());
  const [allPersonalPlans, persLoader, personalError] =
    useRequestStartChargingSelectPlan(planService.getAllPersonalPlan());

  const navigation = useNavigation();

  return (
    <View style={styles.pageWrapper}>
      <GoBackBtn title="Select Plan" />
      <View style={styles.orgContainer}>
        {orgLoader ? (
          <Text>Loading...</Text>
        ) : orgError ? (
          <Text>{orgError}</Text>
        ) : (
          <>
            {allOrganisationPlans?.length > 0 &&
              allOrganisationPlans.map(organisation => {
                return organisation.userplans.map((plan, index) => {
                  const isActive =
                    activeItem === `${organisation.id}-${plan.id}`;
                  return (
                    <PlanItem
                      key={`${organisation.id}${plan.id}`}
                      plan={plan}
                      title={`${plan.displayname} - ${organisation.displayname}`}
                      setActiveItem={setActiveItem}
                      id={`${organisation.id}-${plan.id}`}
                      isActive={isActive}
                      type="org"
                    />
                  );
                });
              })}
          </>
        )}
      </View>
      <Text>other Plans</Text>

      {persLoader ? (
        <Text>Loading...</Text>
      ) : personalError ? (
        <Text>{personalError}</Text>
      ) : (
        allPersonalPlans?.length > 0 &&
        allPersonalPlans?.map((plan, index) => {
          const isActive = activeItem === plan.id;
          return (
            <React.Fragment key={plan.id ? plan.id : Math.random()}>
              <PlanItem
                key={`${plan.id}`}
                plan={plan}
                title={plan.displayname}
                isActive={isActive}
                id={plan.id}
                setActiveItem={setActiveItem}
                type="personal"
              />
            </React.Fragment>
          );
        })
      )}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Start Charging')}>
        <Text style={styles.btnText}>Proceed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Charger Not Connected')}>
        <Text>Charger not connected</Text>
      </TouchableOpacity>
    </View>
  );
};
