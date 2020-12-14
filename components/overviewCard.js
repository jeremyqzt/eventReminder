import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressCircle from 'react-native-progress-circle'
import HR from './hr';

const OverviewCard = (props) => {

  return (
    <View style={[tailwind('mx-4')]}>


      <View style={[styles.cardContainer, tailwind('rounded py-1 my-1')]}>
        <View style={[styles.cardContent, tailwind('flex flex-row')]}>

            <View style={[styles.cardContent, tailwind('flex flex-col')]}>
            <Text style={tailwind('mx-3 text-gray-600 font-bold text-2xl')}>
                {"Birthdays 🎉"}
            </Text>
            <Text style={tailwind('py-1 mx-3 text-gray-600 text-lg')}>
                {"5 Birthdays Celebrated this year"}
            </Text>
            <Text style={tailwind('py-1 mx-3 text-gray-600 text-lg')}>
                {"13 Birthdays still to celebrate"}
            </Text>
            </View>
            <View style={[tailwind('rounded py-1 my-1 mx-3')]}>
                <ProgressCircle
                    percent={70}
                    radius={35}
                    borderWidth={10}
                    color="#3399FF"
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{ fontSize: 16 }}>{'13🎉\n18⏰'}</Text>
                </ProgressCircle>
            </View>
        </View>
        <HR fullLen={true}/>
        <View style={[styles.cardFooter, tailwind('flex flex-row')]}>
            <Text style={tailwind('pb-2 ml-3 text-gray-600 text-lg')}>
                {"Ben's 27th 🎂 is in 5 days!"}
            </Text>
            <Icon
                style={tailwind('pb-2 mr-3')} 
                name={"arrow-right"}
                size={20}
                color={"#3399FF"} />
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
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default OverviewCard;
