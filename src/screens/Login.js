import React, { useState, useEffect } from 'react';
//import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, Button, Alert, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation, route }) => {

  const [myText, setMyText] = useState('');

  const [JSON_DATA, setJSON_DATA] = useState('');

  const loadData = () => {
      fetch('https://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON?srsName=EPSG:4326')
          .then((response) => response.json())
          //.then((responseJson) => { setJSON_DATA(responseJson.features);console.log(responseJson.features); })
          .then((responseJson) => { setJSON_DATA(responseJson.features); })
          
          .catch((error) => {
              console.error(error);
          });
  }

  // Cargamos nuestro JSON nada mas llegar a este componente
  useEffect(() => {
      console.log("Cargamos JSON");
      loadData();
  }, []);

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

        {/*
        <View style={styles.view_input}>
          <Text style={styles.label_input}>Contraseña</Text>
          <TextInput style={styles.input} />
        </View>*/}

        <Button
          title="Entrar"
          
          // Para cambiar de screen => Home - Opcion 1. Con esta opcion se fuerza el renderizado
          /*
          onPress={() => {
            // Cuando se pulse el boton Entrar guardaremos el valor de myText
            saveText(myText);
            
            navigation.dispatch({
              ...StackActions.replace('Home', {
                user: 'ruben',
              }),
              source: route.key,
              target: navigation.getState().key,
            })
          }}*/

          // Para cambiar de screen => Home - =Opcion 2. El navigate tambien permite un segundo parametro para enviar informacion del tipo clave-valor (myData1: 1, myMessage: msg)
          // Cuando se pulse el boton Entrar guardaremos el valor de myText
          onPress={() =>{saveText(myText); navigation.navigate('Home', { JSON_DATA:JSON_DATA })}}
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