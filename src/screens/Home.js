import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';

const Home = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Ver mapa"
                onPress={() => navigation.navigate('ScreenMap', { myData1: 1, myMessage: 'ruben' }) }
            />
            <Button
                title="Ver listado"
                onPress={() => navigation.navigate('ScreenList', { myData1: 1, myMessage: 'ruben' }) }
            />
        </View>
    );
};


export default Home;