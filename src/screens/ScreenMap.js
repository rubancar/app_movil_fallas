import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';

// Para recoger las variables enviadas mediante el navigation.navigate debemos recoger el objeto route ({route.params.myVariable})
const ScreenMap = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Pantalla con monumentos en un mapa</Text>
            <Button
                title="Ver monumento"
                onPress={() => navigation.navigate('Monument', { myData1: 1, myMessage: 'ruben' }) }
            />
            <Button
                color="#a4c936"
                title="Cambiar a lista"
                onPress={() => navigation.dispatch({
                    ...StackActions.replace('ScreenList', {
                      data: 'data',
                    }),
                    source: route.key,
                    target: navigation.getState().key,
                  })}
            />
        </View>
    );
};


export default ScreenMap;