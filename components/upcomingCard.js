import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, Button } from 'react-native';
import tailwind from 'tailwind-rn';

const UpcomingCard = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={[tailwind('mx-5')]}>
      <View style={[styles.cardContainer, tailwind('rounded py-1 my-2')]}>
        <View style={[styles.cardContent, tailwind('flex flex-col')]}>
          <Text style={tailwind('mx-5 text-gray-600 font-bold text-xl')}>
            {"Title"}
          </Text>
          <Text style={tailwind('mx-5 text-gray-600 text-base')}>
            {"The Checklist For Ben's Birthday"}
          </Text>          
          <View style={[tailwind('ml-5 mr-5 justify-between flex flex-row items-center')]}>
            <Text style={[tailwind('text-base')]}>{'Purchased a Gift'}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        <View style={[tailwind('justify-between flex flex-row items-center')]}>
          <Button
            title="Left button"
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title="Right button"
            onPress={() => Alert.alert('Right button pressed')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { x: 0, y: 10 },
    shadowOpacity: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default UpcomingCard;
