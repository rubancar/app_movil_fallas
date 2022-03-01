import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import Login from './src/screens/Login';
import Monument from './src/screens/Monument';
import ScreenMap from './src/screens/ScreenMap';
import ScreenList from './src/screens/ScreenList';
import Profile from './src/screens/Profile';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();

const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={({ navigation, route }) => ({
                    title: 'Inicio',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profile', { myData1: 1 })}
                            style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
                            <FontAwesome name="user-circle-o" size={30} color="black" />
                        </TouchableOpacity>
                    ),
                })} />
                <Stack.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }} />
                <Stack.Screen name="ScreenMap" component={ScreenMap} options={{ title: 'Mapa de monumentos22' }} />
                <Stack.Screen name="ScreenList" component={ScreenList} options={{ title: 'Lista de monumentos' }} />
                <Stack.Screen name="Monument" component={Monument} options={{ title: 'Detalle del monumento' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;