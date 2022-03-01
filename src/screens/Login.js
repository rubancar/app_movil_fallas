import React, { useState } from 'react';
//import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, Button, Alert, StatusBar } from 'react-native';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation, route }) => {

  const [myText, setMyText] = useState('');

  const saveText = async (usuario) => {
    try {
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
        <Text style={styles.welcome_text}>!Bienvenido¡</Text>

        <View style={styles.view_input}>
          <Text style={styles.label_input}>Usuario</Text>
          <TextInput 
            style={styles.input}
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