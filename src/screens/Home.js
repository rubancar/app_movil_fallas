import React, { useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const [username, setUsername] = useState('');

    const readUsername = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
                console.log(value);
                setUsername(value);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // se ejecuta al iniciar el Componente
    useEffect(() => {
        readUsername();
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Bienvenido {username}</Text>
            <Button
                title="Ver mapa"
                onPress={() => navigation.navigate('ScreenMap', { myData1: 1, myMessage: 'ruben' })}
            />
            <Button
                title="Ver listado"
                onPress={() => navigation.navigate('ScreenList', { myData1: 1, myMessage: 'ruben' })}
            />
        </View>
    );
};


export default Home;