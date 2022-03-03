import React, { useState } from 'react';
//import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, Button, Alert, StatusBar } from 'react-native';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation, route }) => {

  const [myText, setMyText] = useState('');

  // Mediante saveText guardaremos el valor del usuario
  const saveText = async (usuario) => {
    try {
      // AsyncStorage implementa una persistencia de datos local que siempre es del tipo clave-valor
      // Aqui estamos guardando en la clave username y valor de usuario
      await AsyncStorage.setItem('username', usuario);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={false}
        backgroundColor="#000000"
        hidden={false} />

      <View>
        {/* Para enlazar un style simplemente debemos hacer style.nombreConstEstilo */}
        <Text style={styles.welcome_text}>¡Bienvenido!</Text>

        <View style={styles.view_input}>
          <Text style={styles.label_input}>Usuario</Text>
          <TextInput 
            style={styles.input}
            // Anyadimos el evento de onChangeText para anyadir el texto introducido en el TextInput
            onChangeText={text => setMyText(text)}
            value={myText}
          />
        </View>

        <View style={styles.view_input}>
          <Text style={styles.label_input}>Contraseña</Text>
          <TextInput style={styles.input} />
        </View>

        <Button
          title="Entrar"
          onPress={() => {
            // Cuando se pulse el boton Entrar guardaremos el valor de myText
            saveText(myText);
            // cambiar de screen => Home
            navigation.dispatch({
              ...StackActions.replace('Home', {
                user: 'ruben',
              }),
              source: route.key,
              target: navigation.getState().key,
            })
          }}
        />
      </View>

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
    backgroundColor: '#f7913d',
  },
  welcome_text: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  label_input: {
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 12,
    width: 100,
  },
  input: {
    height: 25,
    marginBottom: 10,
    borderWidth: 1,
    flexGrow: 1,
    backgroundColor: 'white',
    borderColor: 'white',
  },
  view_input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

export default Login;