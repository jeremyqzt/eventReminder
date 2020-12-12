import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';

const UpcomingCard = (props) => {

  return (
    <View style={[tailwind('mx-1')]}>
      <View style={[styles.cardContainer, tailwind('rounded py-1 my-2')]}>
        <View style={[styles.cardContent, tailwind('flex flex-col')]}>
          <Text style={tailwind('mx-5 text-gray-600 font-bold text-xl')}>
            {"Ben's Birthday"}
          </Text>
          <Text style={tailwind('py-1 mx-5 text-gray-600 text-base')}>
            {"Ben Becomes 26 Today!"}
          </Text>          
        </View>
        <TodoItem textItem={"Purchased a gift for Ben"}/>
      </View>
    </View>
  );
}


const TodoItem = (props) => {
  const [isSelected, setSelection] = useState(false);

  const handleCheck = () => {
    setSelection(!isSelected);
  }

  return (
    <View style={[tailwind('ml-5 mr-5 py-1 justify-between flex flex-row items-center')]}>
      <Text style={[tailwind('text-base')]}>{props.textItem}</Text>
      <TouchableOpacity onPress={handleCheck}> 

        <Icon name={isSelected ? "ios-checkmark-circle-outline" : "md-alert"}
          size={25}
          color={isSelected ? "#add771" : "#aca934"} />
      </TouchableOpacity>
    </View>
  )
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
