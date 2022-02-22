import React from 'react';
import { Text, View } from 'react-native';

const Detail = ({ route }) => {
    return (
        <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> Details Screen, message: </Text>
            <Text>{route.params.myMessage}</Text>
        </View >);
}

export default Detail;