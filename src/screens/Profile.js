import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ route }) => {

    const [username, setUsername] = useState('');

    const readUsername = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
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
        <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> Bienvenido {username} </Text>
        </View >);
}

export default Profile;