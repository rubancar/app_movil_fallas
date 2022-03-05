import React, { useState, useEffect } from 'react';
import { StackActions } from '@react-navigation/native';
import { TextInput, StyleSheet, Text, View, Button, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation, route }) => {

    const [username, setUsername] = useState('');

    const saveText = async (usuario) => {
        try {
          // AsyncStorage implementa una persistencia de datos local que siempre es del tipo clave-valor
          // Aqui estamos guardando en la clave username y valor de usuario
          await AsyncStorage.setItem('username', usuario);
          console.log("Guardamos nuevo nombre"+usuario);
        } catch (error) {
          console.log(error);;
        }
      };

    const readUsername = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            console.log("Usuario leido Profile: "+value);
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
        <View style={styles.container}>
            <View style={{
                flex: 1, alignItems: 'center', justifyContent: 'center'
            }}>
                <Text> Hola {username}, ¿deseas cambiar tu nombre de usuario? </Text>
                <Text>Nuevo nombre</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setUsername(text)}
                    value={username}
                />
                <Button
                    title="Modificar"
                    // Para cambiar de screen => Home - =Opcion 2. El navigate tambien permite un segundo parametro para enviar informacion del tipo clave-valor (myData1: 1, myMessage: msg)
                    // Cuando se pulse el boton Entrar guardaremos el valor de myText
                    //onPress={() => { saveText(username); navigation.navigate('Home') }}
                    
                    onPress={() => {
                        // Cuando se pulse el boton Modificarar guardaremos le nuevo nombre del usuario
                        saveText(username);                       
                        navigation.dispatch({
                          ...StackActions.replace('Home'),
                          source: route.key,
                          target: navigation.getState().key,
                        })
                      }}
                />
            </View >
        </View>
    );
};


// Aqui definimos todos los estilos que seran invocados desde la vista
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        padding: 40,
        backgroundColor: '#ffffff',
    },
    input: {
        height: 25,
        marginBottom: 10,
        borderWidth: 1,
        width: 100,
        backgroundColor: 'white',
        borderColor: 'black',
    },
});

export default Profile;