import React from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';

const HR = (props) => {
    return (
        <View
            style={[{
                borderBottomColor: 'color: rgb(75, 85, 99)',
                borderBottomWidth: 1,
            }, tailwind(!props.fullLen? 'mx-3 my-3': 'my-3 mx-1')]}
        />
    );
}

export default HR;

