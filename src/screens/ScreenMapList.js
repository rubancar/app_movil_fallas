import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenList from './ScreenList';
import ScreenMap from './ScreenMap';
import { colors } from '../libs/ManageData';


const Tab = createMaterialTopTabNavigator();

export default function ScreenMapList({ route, navigation }) {


    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: '#fff',
            inactiveTintColor: 'lightgray',
            style: {
                backgroundColor: colors.naranja,
                paddingBottom: 3
            }
         }}
        >
            <Tab.Screen name="Listado" >
                {() => <ScreenList route={route} navigation={navigation} />}
            </Tab.Screen>
            <Tab.Screen name="Mapa" >
                {() => <ScreenMap route={route} navigation={navigation} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}