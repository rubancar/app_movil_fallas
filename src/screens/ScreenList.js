import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Para recoger las variables enviadas mediante el navigation.navigate debemos recoger el objeto route ({route.params.myVariable})
const ScreenList = ({ navigation, route }) => {

    const VLCitem = ({ item }) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => { navigation.navigate('Monument', { infoMonument: item.properties}) }}>
                    <Text numberOfLines={2} ellipsizeMode='tail'>
                        {item.properties.id} {item.properties.nombre}
                    </Text>
                </TouchableOpacity>
            </View>

        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={route.params.JSON_DATA}
                renderItem={VLCitem}
                keyExtractor={item => item.properties.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 0
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });


export default ScreenList;