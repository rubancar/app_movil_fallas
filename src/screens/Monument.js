import React from 'react';
import { Text, View, Button, StyleSheet,Image } from 'react-native';
import { StackActions } from '@react-navigation/native';

const Monument = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Detalle del monumento de la falla {route.params.infoMonument.nombre}</Text>
            <Text>Sección {route.params.infoMonument.seccion}</Text>
            <Text>Fallera {route.params.infoMonument.fallera}</Text>
            <Text>Presidente {route.params.infoMonument.presidente}</Text>
            <Image style={styles.tinyLogo}  source={{uri: route.params.infoMonument.boceto }}/>
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