import React, { useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {

    // Para anyadir variables que deban ser actualizadas por la App durante su ejecucion utilizaremos useState
    // En los argumentos de const definimos la variable que cambiara (username) y la funcion que se encargara de su actualizacion (setUsername)
    // Ademas en useState podemos definir un valor por defecto como argumento
    const [username, setUsername] = useState('');

    const readUsername = async () => {
        try {
            // AsyncStorage implementa una persistencia de datos local que siempre es del tipo clave-valor
            // Aqui vamos a recoger la informacion guardada en el item username
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
                console.log(value);
                setUsername(value);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Para que el useState se pueda utilizar necesitamos el useEffect que se encargara de actualizar el componente
    // Si dejeamos el ultimo parametro vacio ([]) indicamos que esta funcion se ejecuta al iniciar el Componente
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