import React from 'react';
import { Text, View, Button } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Detalles', { myData1: 1, myMessage: 'ruben' }) }
            />
        </View>
    );
};

export default Home;