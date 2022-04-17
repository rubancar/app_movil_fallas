import React, { useState, useEffect } from 'react';
//import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, Button, Alert, StatusBar } from 'react-native';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../libs/ManageData';

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
        <Text style={styles.welcome_text}>¡Bienvenido a ReactingFalles!</Text>

        <View style={styles.view_input}>
          <TextInput 
            style={styles.input}
            placeholder="Tu usuario"
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
          color={colors.naranja}
          // Para cambiar de screen => Home - Opcion 1. Con esta opcion se fuerza el renderizado
          
          onPress={() => {
            // Cuando se pulse el boton Entrar guardaremos el valor de myText
            saveText(myText);
            
            navigation.dispatch({
              ...StackActions.replace('Home', { JSON_DATA:JSON_DATA }),
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
    backgroundColor: colors.blue
    //backgroundColor: '#f7913d',
  },
  welcome_text: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color:colors.white,
  },
  label_input: {
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 12,
    width: 100,
    
  },
  input: {
    height: 36,
    marginBottom: 10,
    borderWidth: 1,
    flexGrow: 1,
    backgroundColor: 'white',
    borderColor: colors.white,
    textAlign:'center',
    marginBottom:40,
  },
  view_input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop:4,
    
  },
});

export default Login;