import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenList from './ScreenList';
import ScreenMap from './ScreenMap';


const Tab = createMaterialTopTabNavigator();

export default function ScreenMapList({ route, navigation }) {


    return (
        <Tab.Navigator>
            <Tab.Screen name="Listado" >
                {() => <ScreenList route={route} navigation={navigation} />}
            </Tab.Screen>
            <Tab.Screen name="Mapa" >
                {() => <ScreenMap route={route} navigation={navigation} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}