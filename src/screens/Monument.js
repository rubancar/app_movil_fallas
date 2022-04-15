import React from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { colors, timeago } from '../libs/ManageData';

const Monument = ({ navigation, route }) => {

  const { params: { infoMonument } } = route
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Falla {infoMonument.nombre}</Text>
      <Text style={styles.falla_property}>Sección {infoMonument.seccion}</Text>
      <Text style={styles.falla_property}>Fallera {infoMonument.fallera}</Text>
      <Text style={styles.falla_property}>Presidente {infoMonument.presidente}</Text>
      {
        infoMonument.visited && <Text style={styles.falla_property}>
          Visitado {timeago(infoMonument.visited, 'es_ES')}
          </Text>
      }
      <Image style={styles.image} source={{ uri: infoMonument.boceto }} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "80%",
    height: "45%",
    margin: 20,

  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20
  },
  falla_property: {
    fontSize: 20,
    textAlign: "left",
    marginBottom: 15,
    marginLeft: 20
  },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  }
});

export default Monument;