import React from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';

const HR = () => {
    return (
        <View
            style={[{
                borderBottomColor: 'color: rgb(75, 85, 99)',
                borderBottomWidth: 1,
            }, tailwind('mx-3 my-3')]}
        />
    );
}

export default HR;

