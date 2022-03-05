import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import ReactDOM from 'react-dom';

// Para permitir la navegacion las paginas deben recibir el objeto navigation
const Home = ({ navigation }) => {

    // Para anyadir variables que deban ser actualizadas por la App durante su ejecucion utilizaremos useState
    // En los argumentos de const definimos la variable que cambiara (username) y la funcion que se encargara de su actualizacion (setUsername)
    // Ademas en useState podemos definir un valor por defecto como argumento
    const [username, setUsername] = useState('');


    const readUsername = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            console.log("Usuario leido Home: "+value);
            if (value !== null) {
                setUsername(value);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Para que el useState se pueda utilizar necesitamos el useEffect que se encargara de actualizar el componente
    // Si dejeamos el ultimo parametro vacio ([]) indicamos que esta funcion se ejecuta la 1a vez que se renderiza el componente
    useEffect(() => {
        console.log("Refresco");
        readUsername();
    }, []);

    // Si quisiesemos que se redibujara despues de cada renderizado hariamos:
    /*useEffect(() => {
        console.log('I run on every render');
      });*/
    


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Bienvenido {username}</Text>
            <Button
                title="Ver mapa"
                onPress={() => navigation.navigate('ScreenMap')}
            />
            <Button
                title="Ver listado"
                onPress={() => navigation.navigate('ScreenList')}
            />
        </View>
    );
};


export default Home;