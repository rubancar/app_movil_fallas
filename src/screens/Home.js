import React, { Component } from 'react'
import { StyleSheet, View, Image, Button, Dimensions, TouchableOpacity, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import fallas_1 from '../../assets/home/fallas_1.jpg'
import fallas_2 from '../../assets/home/fallas_2.jpg'
import { colors } from '../libs/ManageData'

const deviceWidth = Dimensions.get('window').width;

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ""
        }
    }

    readUsername = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            console.log("Usuario leido Home: "+value);
            if (value !== null) {
                this.setState({username: value});
            }
        } catch (error) {
            console.log(error);
        }
    };


    componentDidMount() {
        this.readUsername();
    }



    render() {

        return (
            <View style={styles.container}>


                {/* IMAGENES */}
                <View style={styles.img_container}>

                    {/* UPPER IMAGE */}
                    <View style={styles.img_box}>
                        <Image source={fallas_1} style={styles.img} resizeMode={'stretch'} />
                    </View>

                    <TouchableOpacity 
                        activeOpacity={0.7} 
                        style={[styles.button_box, {marginLeft: StyleSheet.hairlineWidth}]}
                        onPress={() => this.props.navigation.navigate('ScreenMapList',  { JSON_DATA:this.props.route.params.JSON_DATA })}
                    >
                            <Text style={styles.button_text} ellipsizeMode='tail' numberOfLines={2}>
                                {`HOLA ${this.state.username}, VISITA LAS FALLAS`} 
                            </Text>
                    </TouchableOpacity>

                    
                        
                        {/*
                        <View style={styles.button}>
                            <Button 
                                title={`HOLA ${this.state.username}, VISITA LAS FALLAS`} 
                                type="success" 
                                onPress={() => this.props.navigation.navigate('ScreenMapList',  { JSON_DATA:this.props.route.params.JSON_DATA })}
                            />
                        </View>
                        */}
                    

                    {/* BELOW IMAGE */}
                    <View style={styles.img_box}>
                        <Image source={fallas_2} style={styles.img} resizeMode={'stretch'} />
                    </View>
                </View>

                {/* BUSCAR */}
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
    },
    img_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    img_box: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: '100%',
        width: '100%',
    },
    img_loading: {
        height: '70%',
        width: '70%',
    },
    button: {
        backgroundColor: '#fff',
        position: 'absolute',
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        zIndex: 99
    },
    button_box: {
        backgroundColor: colors.naranja,
        padding: 10,
        borderRadius: 0,
        marginLeft: 10
    },
    button_text: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 26,
        textAlign: 'center'
    }
});
