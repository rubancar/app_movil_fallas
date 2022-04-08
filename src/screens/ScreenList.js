import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { setFallaAsVisited, get, getVisitedFallas } from '../libs/ManageData';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


// Para recoger las variables enviadas mediante el navigation.navigate debemos recoger el objeto route ({route.params.myVariable})
const ScreenList = ({ navigation, route }) => {

    console.log("**********************************************")
    console.log(route.params.JSON_DATA[0].properties.nombre)

    const [visitados, setVisitados] = useState(null);
    const [jsonData, setJsonData] = useState(null);

    // Funcion para ordenar
    const ordenarPorNombre = (array, campo) => {
        array.sort( function( a, b ) {
            a = a.properties[campo].toLowerCase();
            b = b.properties[campo].toLowerCase();
        
            return a < b ? -1 : a > b ? 1 : 0;
        });
    }
    

    // Ejecuta la 1ra vez que entra al componente
    useEffect(async () => {

        const visitedFallas = await getVisitedFallas()
        console.log(`visitedFallas => ${visitedFallas}`)
        setVisitados(visitedFallas)

        //console.log(visitedFallas)
        
    }, []);

    
    // ejecuta la 1ra vez que entra al componenente
    useEffect(() => {

        const deepCloneData = JSON.parse(JSON.stringify(route.params.JSON_DATA));
        console.log("after deep clonning")
        //console.log(deepCloneData)
        ordenarPorNombre(deepCloneData, "seccion")
        setJsonData(deepCloneData)
        
    }, []);


    const saveFallaAsVisited = (fallaId) => {

        const visitedFallas = setFallaAsVisited(true)
        setVisitados(visitedFallas)

    }


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

    const VLCitem = ({ item }) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => { navigation.navigate('Monument', { infoMonument: item.properties }) }}>
                    <View style={styles.fila}>

                        {/** Color y sección de la falla */}
                        <Text style={[styles.seccion, getBackgroundColor(item.properties.seccion)]}>
                            {item.properties.seccion}
                        </Text>

                        {/** Nombre de la falla */}
                        <Text style={styles.nombre}>
                            {item.properties.nombre}
                        </Text>

                        {/** Marcador que indica si la falla ha sido visitada o no */}
                        <TouchableOpacity
                            onPress={() => setFallaAsVisited(item.properties.id)}
                            style={{ paddingTop: 2, paddingBottom: 0, paddingLeft: 10, paddingRight: 10 }}>
                            <FontAwesome name="check" size={25} color="gray" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }

    return (
        <View style={styles.container}>
            {/** Revisar los visitados.... */}
            <FlatList
                data={jsonData}
                renderItem={VLCitem}
                keyExtractor={item => item.properties.id}
                initialNumToRender={20}
            />
        </View>
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
    fila: {
        flexDirection: 'row',
        height: 40,
    },
    nombre: {
        textAlignVertical: 'center',
        marginLeft: 8,

    },
    seccion: {
        borderWidth: 2,
        backgroundColor: 'blue',
        borderRadius: 4,
        width: '10%',
        textAlignVertical: 'center',
        textAlign: 'center'

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


export default ScreenList;