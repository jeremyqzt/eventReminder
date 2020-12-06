import React from 'react';
import { Text, View } from 'react-native';
import tailwind from 'tailwind-rn';

const SectionHeading = (props) => {
    return (
        <View>
            <Text style={tailwind('mx-5 text-gray-600 font-bold text-xl')}>
                {`${props.headingText}`}
            </Text>
        </View>
    );
}

export default SectionHeading;
