import React from 'react';
import { Text, View } from 'react-native';
const Saludo = (props) => {
    return (
        <View>
            <Text>Saludos {props.name}!</Text>
        </View>
    );
}
const Saludos = () => {
    return (
        <View>
            <Saludo name='Jesús' />
            <Saludo name='Pedro' />
            <Saludo name='Pablo' />
        </View>
    );
}
export default Saludos;