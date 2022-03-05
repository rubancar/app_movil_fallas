import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

// Para recoger las variables enviadas mediante el navigation.navigate debemos recoger el objeto route ({route.params.myVariable})
const ScreenList = ({ navigation, route }) => {

    const [JSON_DATA, setJSON_DATA] = useState('');

    const loadData = () => {
        fetch('https://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON?srsName=EPSG:4326')
            .then((response) => response.json())
            .then((responseJson) => { console.log(responseJson.features[0].properties.id); setJSON_DATA(responseJson.features); })
            .catch((error) => {
                console.error(error);
            });
    }

    // Cargamos nuestro JSON nada mas llegar a este componente
    useEffect(() => {
        console.log("Cargamos JSON");
        loadData();
    }, []);

    const VLCitem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => { navigation.navigate('Monument', { infoMonument: item.properties}) }}>
                    <Text numberOfLines={2} ellipsizeMode='tail'>
                        {item.properties.id} {item.properties.nombre}
                    </Text>
                </TouchableOpacity>
                <Text>------------------</Text>
            </View>

        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Pantalla con la lista de monumentos</Text>

            <FlatList
                data={JSON_DATA}
                renderItem={VLCitem}
                keyExtractor={item => item.properties.id}
            />


            <Button
                title="Ver monumento"
                onPress={() => { navigation.navigate('Monument', { myData1: 1, myMessage: 'ruben' }) }}
            />

            <Button
                color="#a4c936"
                title="Cambiar a mapa"
                onPress={() => navigation.dispatch({
                    ...StackActions.replace('ScreenMap', {
                        data: 'data',
                    }),
                    source: route.key,
                    target: navigation.getState().key,
                })}
            />
        </View>
    );
};


export default ScreenList;