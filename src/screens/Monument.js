import React from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { timeago } from '../libs/ManageData';

const Monument = ({ navigation, route }) => {

  const { params: { infoMonument } } = route
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detalle del monumento de la falla {infoMonument.nombre}</Text>
      <Text>Sección {infoMonument.seccion}</Text>
      <Text>Fallera {infoMonument.fallera}</Text>
      <Text>Presidente {infoMonument.presidente}</Text>
      {
        infoMonument.visited && <Text>Visitado {timeago(infoMonument.visited, 'es_ES')}</Text>
      }
      <Image style={styles.tinyLogo} source={{ uri: infoMonument.boceto }} />
    </View>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 500,
    height: 500,
  },
});

export default Monument;