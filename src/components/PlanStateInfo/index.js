import React from 'react';
import {Text, View} from 'react-native';
import {PlansPopup} from '../plansPopup';
import styles from './style';

export const PlanStateInfo = ({isLine, plan, state}) => {
  const unitFormatter = (unit, rs = false) => {
    //function to format units
    const formattedUnit =
      unit.split('')[0].toUpperCase() +
      unit.slice(1, unit.length).toLowerCase();
    return rs ? `${rs}/${formattedUnit}` : ' ' + formattedUnit;
  };
  const dataFormatHandler = (type, rs = false, isFastCharging = null) => {
    //function checks data and shows formatted text
    return type.statevalue !== null
      ? typeof type.statevalue[state] === 'undefined'
        ? 'Not applicable'
        : `${type.statevalue[state]} ${
            type.timeconstraint !== null ? type.timeconstraint : ''
          } ${unitFormatter(type.unit, rs)} ${
            isFastCharging ? isFastCharging : ''
          }`
      : `${type.basicvalue} ${
          type.timeconstraint !== null ? type.timeconstraint : ''
        } ${unitFormatter(type.unit, rs)} ${
          isFastCharging ? isFastCharging : ''
        }`;
  };
  const IncludeSectionFormatter = ({type, includes}) => {
    //component is needed to render and format Includes Section with Popup
    const headline = includes[type] && dataFormatHandler(includes[type][0]);

    return (
      headline && (
        <>
          {includes[type] !== null && (
            <View style={styles.includesValueContainer}>
              <Text style={styles.value}>{headline}</Text>
              <PlansPopup
                includes={includes[type]}
                headline={`${headline} (${state})`}
              />
            </View>
          )}
        </>
      )
    );
  };

  return (
    <>
      {plan ? (
        <>
          <Text style={styles.stateTitle}>{state}</Text>
          {plan?.INCLUDES !== null && (
            <>
              <Text style={styles.title}>Includes:</Text>
              {['CHARGING', 'FAST-CHARGING', 'PARKING'].map(type => {
                //checking of all avaliable types (if type is not null we should render it)
                return (
                  <IncludeSectionFormatter
                    key={type}
                    type={type}
                    includes={plan?.INCLUDES}
                  />
                );
              })}
            </>
          )}

          {plan?.OVERAGE !== null && (
            <>
              <>
                {(plan?.OVERAGE?.CHARGING !== null ||
                  plan?.OVERAGE['FAST-CHARGING'] !== null) && (
                  <>
                    <Text style={styles.title}>Charging rates:</Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.value}>
                        {plan?.OVERAGE?.CHARGING !== null &&
                          dataFormatHandler(plan?.OVERAGE?.CHARGING[0], 'Rs')}
                      </Text>
                      {plan?.OVERAGE?.CHARGING !== null &&
                        plan?.OVERAGE['FAST-CHARGING'] !== null && (
                          <View style={styles.divider}></View>
                        )}
                      <Text style={styles.value}>
                        {plan?.OVERAGE['FAST-CHARGING'] !== null &&
                          dataFormatHandler(
                            plan?.OVERAGE['FAST-CHARGING'][0],
                            'Rs',
                            '(fast charging)',
                          )}
                      </Text>
                    </View>
                  </>
                )}
              </>
              {plan?.OVERAGE?.PARKING && (
                <>
                  <Text style={styles.title}>Parking overage:</Text>
                  <Text style={styles.value}>
                    {plan?.OVERAGE?.PARKING !== null &&
                      dataFormatHandler(plan?.OVERAGE?.PARKING[0], 'Rs')}
                  </Text>
                </>
              )}
            </>
          )}

          {plan?.USAGE !== null && (
            <>
              {(plan?.USAGE?.CHARGING !== null ||
                plan?.USAGE['FAST-CHARGING'] !== null) && (
                <>
                  <Text style={styles.title}>Charging rates:</Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.value}>
                      {plan?.USAGE?.CHARGING !== null &&
                        dataFormatHandler(plan?.USAGE?.CHARGING[0], 'Rs')}
                    </Text>
                    {plan?.USAGE?.CHARGING !== null &&
                      plan?.USAGE['FAST-CHARGING'] !== null && (
                        <View style={styles.divider}></View>
                      )}
                    <Text style={styles.value}>
                      {plan?.USAGE['FAST-CHARGING'] !== null &&
                        dataFormatHandler(
                          plan?.USAGE['FAST-CHARGING'][0],
                          'Rs',
                          '(fast charging)',
                        )}
                    </Text>
                  </View>
                </>
              )}
              {plan?.USAGE?.PARKING && (
                <>
                  <Text style={styles.title}>Parking overage:</Text>
                  <Text style={styles.value}>
                    {plan?.USAGE?.PARKING !== null &&
                      dataFormatHandler(plan?.USAGE?.PARKING[0], 'Rs')}
                  </Text>
                </>
              )}
            </>
          )}

          {isLine && ( //drawing of bottom line
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#F4F2F2',
                marginVertical: 24,
              }}
            />
          )}
        </>
      ) : (
        <Text>No Data</Text>
      )}
    </>
  );
};
