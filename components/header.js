import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tailwind from 'tailwind-rn';

const HeadingGreet = () => {
    const date = new Date()
    const monthAbbreviation = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const greeting = (date.getHours() >= 17) ? "Evening": (date.getHours() < 13) ? "Morning": "Afternoon";

    return (
        <View>
            <Text style={tailwind('text-gray-600 font-bold text-2xl')}>
                {`Good ${greeting}`}
            </Text>
            <Text style={tailwind('text-gray-500 font-semibold text-lg')}>
                {`${weekDay[date.getDay()]}, ${monthAbbreviation[date.getMonth()]}-${date.getDate()} ${date.getFullYear()}`}
            </Text>
        </View>
    );
}

const HeadingImage = () => {
    return (
        <View style={tailwind('items-center justify-between bg-red-500 rounded px-1 py-1')}>
            <Icon name="cake" size={25} color="white" style={tailwind('items-center')} />
        </View>
    );
}

const Heading = () => {
    return (
        <View style={tailwind('px-5 py-1 flex-row flex justify-between items-center')}>
            <HeadingGreet />
            <HeadingImage />
        </View>
    );
}



export default Heading;
