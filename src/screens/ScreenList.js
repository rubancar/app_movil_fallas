import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';

const ScreenList = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Pantalla con la lista de monumentos</Text>
            <Button
                title="Ver monumento"
                onPress={() => navigation.navigate('Monument', { myData1: 1, myMessage: 'ruben' }) }
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