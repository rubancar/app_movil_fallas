import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getVisitedFallas } from '../libs/ManageData';

// Para recoger las variables enviadas mediante el navigation.navigate debemos recoger el objeto route ({route.params.myVariable})
const ScreenMap = ({ navigation, route }) => {

    // Mantiene la ubicación y errores de la librería
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [fallasData, setFallasData] = useState(null);

    // Ejecuta la 1ra vez que entra al componente
    useEffect(async () => {

        // esto se ejecuta en background
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location_ = await Location.getCurrentPositionAsync({});
          setLocation(location_);
        })();

        const deepCloneData = JSON.parse(JSON.stringify(route.params.JSON_DATA));
        const fallasDataInDictionary = {}
        const visitedFallas = await getVisitedFallas()
        deepCloneData.forEach( falla => {

          const { properties, geometry } = falla

          let visited = null
          if (properties.id in visitedFallas) {
              visited = visitedFallas[properties.id]
          }

          fallasDataInDictionary[properties.id] = {
          id: properties.id,
          nombre: properties.nombre,
          seccion: properties.seccion,
          fallera: properties.fallera,
          boceto: properties.boceto,
          visited: visited,
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0]
        }})
        setFallasData(fallasDataInDictionary)

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

          { fallasData &&
          Object.values(fallasData).map((item, i) => 
            <Marker
              key={i}
              coordinate={{ latitude : item.latitude , longitude : item.longitude} }
              onPress={() => { { navigation.navigate('Monument', { infoMonument: item }) }}}
              pinColor={ item.visited ? "darkgreen" : "red" }
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