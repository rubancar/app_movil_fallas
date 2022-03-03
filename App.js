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
        // Desde el navigation container gestionamos toda la nevegacion de la app
        <NavigationContainer>
            {/* En el initialRouteName le indicamos cual es la pagina inicial de nuestra App */}
            <Stack.Navigator initialRouteName="Login">

                {/***********************************/}
                {/****** PANTALLA DE LOGIN **********/}
                {/***********************************/}

                {/* En stack.screen apilamos todas las pantallas que tendra nuestra aplicacion */}
                {/* En name tenemos el titulo de la pantallas y en component el .js asociado */}
                {/* Con la directiva headershow podemos decidir si mostrar la barra del titulo o no */} 
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />


                {/***********************************/}
                {/****** PANTALLA DE HOME **********/}
                {/***********************************/}
                <Stack.Screen name="Home" component={Home} options={({ navigation, route }) => ({
                    title: 'Inicio',
                    // Hay un atributo que es headerRight que nos sirve para anyadir el icono de perfil en la parte derecha de la barra de tareas
                    // Esto deberemos anyadirlo en todas aquellas zonas donde deseamos que aparezca
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profile', { myData1: 1 })}
                            style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
                            <FontAwesome name="user-circle-o" size={30} color="black" />
                        </TouchableOpacity>
                    ),
                })} />

                {/***********************************/}
                {/****** PANTALLA DE PROFILE **********/}
                {/***********************************/}
                <Stack.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }} />

                {/***********************************/}
                {/****** PANTALLA DE MAPA **********/}
                {/***********************************/}
                <Stack.Screen name="ScreenMap" component={ScreenMap} options={({ navigation, route }) => ({
                    title: 'Mapa de monumentos',
                    // Hay un atributo que es headerRight que nos sirve para anyadir el icono de perfil en la parte derecha de la barra de tareas
                    // Esto deberemos anyadirlo en todas aquellas zonas donde deseamos que aparezca
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profile', { myData1: 1 })}
                            style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
                            <FontAwesome name="user-circle-o" size={30} color="black" />
                        </TouchableOpacity>
                    ),
                })} />

                {/***********************************/}
                {/****** PANTALLA DE LISTADO **********/}
                {/***********************************/}
                <Stack.Screen name="ScreenList" component={ScreenList} options={({ navigation, route }) => ({
                    title: 'Lista de monumentos',
                    // Hay un atributo que es headerRight que nos sirve para anyadir el icono de perfil en la parte derecha de la barra de tareas
                    // Esto deberemos anyadirlo en todas aquellas zonas donde deseamos que aparezca
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profile', { myData1: 1 })}
                            style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
                            <FontAwesome name="user-circle-o" size={30} color="black" />
                        </TouchableOpacity>
                    ),
                })} />

                {/***********************************/}
                {/**** PANTALLA DETALLE MONUMENTO ****/}
                {/***********************************/}
                <Stack.Screen name="Monument" component={Monument} options={({ navigation, route }) => ({
                    title: 'Detalle del monumento',
                    // Hay un atributo que es headerRight que nos sirve para anyadir el icono de perfil en la parte derecha de la barra de tareas
                    // Esto deberemos anyadirlo en todas aquellas zonas donde deseamos que aparezca
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profile', { myData1: 1 })}
                            style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
                            <FontAwesome name="user-circle-o" size={30} color="black" />
                        </TouchableOpacity>
                    ),
                })} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;