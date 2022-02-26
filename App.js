import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import Login from './src/screens/Login';
import Monument from './src/screens/Monument';
import ScreenMap from './src/screens/ScreenMap';
import ScreenList from './src/screens/ScreenList';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ScreenMap" component={ScreenMap} options={{ title: 'Mapa de monumentos' }}/>
                <Stack.Screen name="ScreenList" component={ScreenList} options={{ title: 'Lista de monumentos' }}/>
                <Stack.Screen name="Monument" component={Monument} options={{ title: 'Detalle del monumento' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;