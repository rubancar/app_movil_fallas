import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { colors } from '../libs/ManageData';


const Profile = ({ navigation, route }) => {

    // Variable que se utilizara para almacenar la img que se compartira
    let [selectedImage, setSelectedImage] = React.useState(null);

    const [username, setUsername] = useState('');

    // Funcion para guardar el usuario
    const saveText = async (usuario) => {
        try {
            // AsyncStorage implementa una persistencia de datos local que siempre es del tipo clave-valor
            // Aqui estamos guardando en la clave username y valor de usuario
            await AsyncStorage.setItem('username', usuario);
            console.log("Guardamos nuevo nombre" + usuario);
        } catch (error) {
            console.log(error);;
        }
    };

    // Funcion para leer el usuario
    const readUsername = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            console.log("Usuario leido Profile: " + value);
            if (value !== null) {
                setUsername(value);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // se ejecuta al iniciar el Componente
    useEffect(() => {
        readUsername();
    }, []);


    // Bloque para gestionar la posibilidad de compartir informacion
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('El permiso para acceder a la camana es necesario!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });
    };

    let openShareDialogAsync = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            alert(`El modo compartir no esta disponible en tu plataforma`);
            return;
        }

        await Sharing.shareAsync(selectedImage.localUri);
    };

    // Esta es la vista que se mostrara despues de seleccionar la imagen que se desea compartir
    if (selectedImage !== null) {
        return (
            <View style={styles.container}>
                <View style={styles.fila_property_seccion}>
                    <Text style={styles.falla_property_seccion}>Previsualización</Text>
                </View>
                <View style={styles.cuerpoSeccion}>
                    <View style={styles.containerImage} >
                        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
                    </View>

                    <Text style={styles.textoCuerpoSeccion}>Estás a punto de compartir esta imagen</Text>
                    <Text style={styles.textoCuerpoSeccion}>¿Estás seguro?</Text>
                    <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                        <Text style={styles.buttonText}>ACEPTAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.fila_property_seccion}>
                <Text style={styles.falla_property_seccion}>Opciones de usuario</Text>
            </View>
            <View style={styles.cuerpoSeccion}>
                <Text style={styles.textoCuerpoSeccion}> Hola {username}, ¿deseas cambiar tu nombre de usuario? </Text>
                <Text style={[styles.textoCuerpoSeccion, { fontWeight: 'bold', marginTop: 2 }]}>Nuevo nombre</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setUsername(text)}
                    value={username}
                />
                <View style={styles.botonesPerfil}>
                    <Button

                        title="Modificar"
                        color={colors.naranja}

                        onPress={() => {
                            // Cuando se pulse el boton Modificarar guardaremos le nuevo nombre del usuario
                            saveText(username);
                        }}
                    />
                </View>
            </View>
            <View style={styles.fila_property_seccion}>
                <Text style={styles.falla_property_seccion}>Compartir</Text>
            </View>
            <View style={styles.cuerpoSeccion}>
                <Text style={styles.textoCuerpoSeccion}>
                    ¿Quieres compartir una foto con alguien?
                </Text>
                <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                    <Text style={styles.buttonText}>COMPARTIR UNA IMAGEN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


// Aqui definimos todos los estilos que seran invocados desde la vista
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection: "column",
        //justifyContent: 'center',
        //padding: 40,
        backgroundColor: '#ffffff',
    },
    cuerpoSeccion: {
        flex: 1,
        padding: 20,
    },
    textoCuerpoSeccion: {
        textAlign: 'center',
    },
    input: {
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 1,
        width: '100%',
        backgroundColor: colors.white,
        borderColor: colors.black,
        textAlign: 'center',
        fontSize: 16,
        color: colors.black,
        backgroundColor: colors.grey
    },
    logo: {
        width: 120,
        height: 50,
        marginBottom: 20,
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 24
    },
    fila_property_seccion: {
        alignItems: 'center',
        backgroundColor: colors.white,
        justifyContent: 'center',
        borderBottomColor: colors.blue,
        borderBottomWidth: 2,
        borderTopColor: colors.blue,
        borderTopWidth: 2,
    },
    falla_property_seccion: {
        color: colors.blue,
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10,
        fontWeight: 'bold',
    },
    botonesPerfil: {
        marginBottom: 5,
        marginTop: 10,
    },
    button: {
        backgroundColor: colors.naranja,
        padding: 12,
        marginTop: 18,
    },
    buttonText: {
        color: colors.white,
        textAlign: 'center'
    },
    containerImage: {
        //justifyContent: 'center',
        alignItems: 'center',

        //marginBottom: 10,
        marginTop: 10,

    },
});

export default Profile;