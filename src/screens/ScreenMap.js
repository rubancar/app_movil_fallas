import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, Dimensions } from 'react-native';
import { StackActions } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// Para recoger las variables enviadas mediante el navigation.navigate debemos recoger el objeto route ({route.params.myVariable})
const ScreenMap = ({ navigation, route }) => {

    // Mantiene la ubicación y errores de la librería
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    // Ejecuta la 1ra vez que entra al componente
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location_ = await Location.getCurrentPositionAsync({});
          //console.log(location_);
          setLocation(location_);
          //console.log(route.params.JSON_DATA);
           
        })();
      }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MapView onPress={() => {console.log("Holaaa") }}
                initialRegion={{
                    latitude: 39.4698,
                    longitude: -0.3763,
                    latitudeDelta: 0.12,
                    longitudeDelta: 0.12,
                }}
                showsUserLocation = {true}
                followUserLocation = {true}
                zoomEnabled = {true}
                style={styles.map} >

{route.params.JSON_DATA.map((marker, i) => 
            <Marker
              key={i}
              coordinate={{ latitude : marker.geometry.coordinates[1] , longitude : marker.geometry.coordinates[0]} }
              onPress={() => { { navigation.navigate('Monument', { infoMonument: marker.properties}) }}}
              
            />
          )}   
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: (Dimensions.get('window').height) - 100,
    },
  });


export default ScreenMap;