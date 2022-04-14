import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { setFallaAsVisited, getVisitedFallas, distanceBetween2Points, timeago } from '../libs/ManageData';
import * as Location from 'expo-location';

import { SearchBar } from 'react-native-elements';


// Para recoger las variables enviadas mediante el navigation.navigate debemos recoger el objeto route ({route.params.myVariable})
const ScreenList = ({ navigation, route }) => {

    console.log("**********************************************")
    //console.log(route.params.JSON_DATA[0].properties.nombre)

    const [fallasData, setFallasData] = useState(null);

    // Funcion para ordenar
    const ordenarPorNombre = (array, campo) => {
        array.sort(function (a, b) {
            a = a[campo].toLowerCase();
            b = b[campo].toLowerCase();

            return a < b ? -1 : a > b ? 1 : 0;
        });
    }


    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);



    // ejecuta la 1ra vez que entra al componenente
    useEffect(async () => {

        // esto se ejecuta en background
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }
    
        let locationUser = await Location.getCurrentPositionAsync({})
        const { coords: { latitude, longitude } } = locationUser

        // copia los datos desde el route.params.JSON_DATA
        const deepCloneData = JSON.parse(JSON.stringify(route.params.JSON_DATA));
        const fallasDataInDictionary = {}

        // consulto a localStorage las fallas ya visitadas
        const visitedFallas = await getVisitedFallas()
        deepCloneData.forEach( falla => {

            const { properties, geometry: { coordinates } } = falla

            let visited = null

            // calculo la distancia desde mi ubicación actual a cada una de las fallas
            let distance = distanceBetween2Points(latitude, longitude, coordinates[1], coordinates[0]).toFixed(2)
            if (properties.id in visitedFallas) {
                visited = visitedFallas[properties.id]
            }

            fallasDataInDictionary[falla.properties.id] = {
            id: properties.id,
            nombre: properties.nombre,
            seccion: properties.seccion,
            fallera: properties.fallera,
            boceto: properties.boceto,
            visited: visited,
            distance: distance
        }})
        setFallasData(fallasDataInDictionary)
        
        // transformo el diccionario en un array
        setFilteredDataSource(Object.values(fallasDataInDictionary))

        //setMasterDataSource(deepCloneData);

    }, []);

    const searchFilterFunction = (text) => {
        console.log("Filtrando...")
        // Check if searched text is not blank
        if (text) {
            console.log("Hay texto"+text)
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = arrayData.filter(function (item) {
            const itemData = item.nombre
              ? item.nombre.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
            console.log("NO texto"+text)
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredDataSource(arrayData);
          setSearch(text);
        }
      };


    const saveFallaAsVisited = (fallaId) => {
        const fallasDataInDictionary  = fallasData
        fallasDataInDictionary[fallaId]["visited"] = new Date().toISOString()
        /** usamos la notación spread operator para crear un nuevo objeto y lanzar que React
        *   lance un neuvo renderizado */ 
        setFallasData({...fallasDataInDictionary})
        setFallaAsVisited(fallaId)
    }


    const createAlertDialog = (nameFalla, id) =>
        Alert.alert(
            "Visitar falla",
            `¿Marcar la falla ${nameFalla} como visitada?`,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: () => saveFallaAsVisited(id)
                }
            ]
    );

    const VLCitem = ({ item }) => {
    
        return (
            <View style={styles.item} key={item.id}>
                
                    <View style={styles.fila}>
    
                        {/** Color y sección de la falla */}
                        <TouchableOpacity onPress={() => { navigation.navigate('Monument', { infoMonument: item }) }}>
                            <View style={styles.fila_info}>
                                <Text style={[styles.seccion, getBackgroundColor(item.seccion)]}>
                                    {item.seccion}
                                </Text>
        
                                {/** Nombre de la falla */}
                                <View>
                                    <Text style={styles.nombre}>
                                        {item.nombre}
                                    </Text>

                                    <Text style={styles.extra_info_list}>
                                        {
                                            item.visited ? 
                                                `Distancia: ${item.distance} km, visitado ${timeago(item.visited, 'es_ES')}` : 
                                                `Distancia ${item.distance} km`
                                        }
                                    </Text>
                                </View>
                                
                            </View>
                        </TouchableOpacity>
    
                        {/** Marcador que indica si la falla ha sido visitada o no */}
                        <TouchableOpacity
                            // onPress={() => setFallaAsVisited(item.properties.id)}
                            onPress={() => createAlertDialog(item.nombre, item.id)}
                            style={{ paddingTop: 2, paddingBottom: 0, paddingLeft: 10, paddingRight: 10 }}>
                            <FontAwesome name={item.visited ? "check" : "circle-thin"} size={25} color="gray" />
                        </TouchableOpacity>
                    </View>
                
            </View>
    
        );
    }

    let arrayData = null
    if(fallasData) { 
        // Cambia de diccionario a una lista
        arrayData = Object.values(fallasData)

        // Se ordena la lista por nombres
        ordenarPorNombre(arrayData, "seccion")
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <SearchBar
                round
                searchIcon={{ size: 24 }}
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={(text) => searchFilterFunction('')}
                placeholder="Type Here..."
                value={search}
            />
            {/** Revisar los visitados.... */}
            {
                filteredDataSource && 
                <FlatList
                    data={filteredDataSource}
                    renderItem={VLCitem}
                    keyExtractor={item => item.id}
                    initialNumToRender={20}
                    maxToRenderPerBatch={30}
                    windowSize={10}
                />
            }
            
        </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    fila_info: {
        flexDirection: 'row'
    },
    fila: {
        flexDirection: 'row',
        height: 40,
        justifyContent: "space-between"
    },
    nombre: {
        textAlignVertical: 'center',
        marginLeft: 8,
    },
    extra_info_list: {
        fontSize: 11,
        color: "gray",
        marginLeft: 8,
    },
    seccion: {
        borderWidth: 2,
        backgroundColor: 'blue',
        borderRadius: 4,
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingLeft: 8,
        paddingRight: 8
    },
    // GRIS
    seccionE: {
        backgroundColor: '#dcdcdc',
        borderColor: '#a7a7a7',
    },
    // VERDE
    seccion1A: {
        backgroundColor: '#98ff96',
        borderColor: '#5ccb5f',

    },
    seccion1B: {
        backgroundColor: '#009929',
        borderColor: '#005d16',
    },
    // AZUL
    seccion2A: {
        backgroundColor: '#b9ffff',
        borderColor: '#81c9fa',
    },
    seccion2B: {
        backgroundColor: '#2196f3',
        borderColor: '#155db1',
    },
    // ROJO
    seccion3A: {
        backgroundColor: '#ffa372',
        borderColor: '#ff6c3e',
    },
    seccion3B: {
        backgroundColor: '#ff0000',
        borderColor: '#b10005',
    },
    seccion3C: {
        backgroundColor: '#FC4F4F',
        borderColor: '#fe2323',
    },
    // AMARILLO
    seccion4A: {
        backgroundColor: '#ffffa2',
        borderColor: '#ffff6a',
    },
    seccion4B: {
        backgroundColor: '#ffff00',
        borderColor: '#d6d604',
    },
    seccion4C: {
        backgroundColor: '#b7be00',
        borderColor: '#738000',
    },
    // NARANJA
    seccion5A: {
        backgroundColor: '#ffcc50',
        borderColor: '#fbc43e',
    },
    seccion5B: {
        backgroundColor: '#ff9800',
        borderColor: '#e78b03',
    },
    seccion5C: {
        backgroundColor: '#d97715',
        borderColor: '#c66709',
    },
    // MORADO
    seccion6A: {
        backgroundColor: '#f988ff',
        borderColor: '#ec57f4',
    },
    seccion6B: {
        backgroundColor: '#bc4ed8',
        borderColor: '#b831da',
    },
    seccion6C: {
        backgroundColor: '#ac33dc',
        borderColor: '#7f00b2',
    },
    // MARRON
    seccion7A: {
        backgroundColor: '#ffb48a',
        borderColor: '#fca270',
    },
    seccion7B: {
        backgroundColor: '#c57d56',
        borderColor: '#c66835',
    },
    seccion7C: {
        backgroundColor: '#8d4925',
        borderColor: '#923c0e',
    },
    // TURQUESA
    seccion8A: {
        backgroundColor: '#d5ffff',
        borderColor: '#b0f7f7',
    },
    seccion8B: {
        backgroundColor: '#9ce0db',
        borderColor: '#6aded5',
    },
    seccion8C: {
        backgroundColor: '#5dc1b9',
        borderColor: '#3ebcb2',
    }
});

// Funcion para extraer el color de la seccion
const getBackgroundColor = seccion => {
    if (seccion === 'E') {
        return styles.seccionE
    }
    if (seccion === '1A') {
        return styles.seccion1A
    }
    if (seccion === '1B') {
        return styles.seccion1B
    }
    if (seccion === '2A') {
        return styles.seccion2A
    }
    if (seccion === '2B') {
        return styles.seccion2B
    }
    if (seccion === '3A') {
        return styles.seccion3A
    }
    if (seccion === '3B') {
        return styles.seccion3B
    }
    if (seccion === '3C') {
        return styles.seccion3C
    }
    if (seccion === '4A') {
        return styles.seccion4A
    }
    if (seccion === '4B') {
        return styles.seccion4B
    }
    if (seccion === '4C') {
        return styles.seccion4C
    }
    if (seccion === '5A') {
        return styles.seccion5A
    }
    if (seccion === '5B') {
        return styles.seccion5B
    }
    if (seccion === '5C') {
        return styles.seccion5C
    }
    if (seccion === '6A') {
        return styles.seccion6A
    }
    if (seccion === '6B') {
        return styles.seccion6B
    }
    if (seccion === '6C') {
        return styles.seccion6C
    }
    if (seccion === '7A') {
        return styles.seccion7A
    }
    if (seccion === '7B') {
        return styles.seccion7B
    }
    if (seccion === '7C') {
        return styles.seccion7C
    }
    if (seccion === '8A') {
        return styles.seccion8A
    }
    if (seccion === '8B') {
        return styles.seccion8B
    }
    if (seccion === '8C') {
        return styles.seccion8C
    }

};


export default ScreenList;