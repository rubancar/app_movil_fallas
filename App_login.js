/**
 * Ejercicio: Pantalla Login
 * Rubén Carvajal
 * Jonathan Mariano
 */

import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, Button, Alert } from 'react-native';
//import  Saludos from './src/Saludo'
//import ClicMe from './src/Clickme';

export default function App() {
  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.welcome_text}>!Bienvenido¡</Text>

        <View style={styles.view_input}>
          <Text style={styles.label_input}>Usuario</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.view_input}>
          <Text style={styles.label_input}>Contraseña</Text>
          <TextInput style={styles.input} />
        </View>

        <Button 
          title = "Entrar" 
          onPress = {() => Alert.alert("Entrar!")}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
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
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
