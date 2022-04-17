import React from 'react';
import { Text, View, Button, StyleSheet, Image, Share, TouchableOpacity, Platform, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { colors, timeago } from '../libs/ManageData';

const Monument = ({ navigation, route }) => {



  const { params: { infoMonument } } = route

  // Formateamos correctamente la salida de la variable Proteccion
  let literalProteccion="";
  if (infoMonument.proteccion=="S"){
    literalProteccion="Sí";
  }
  else{
    literalProteccion="No";
  }
  return (
    <View style={styles.container}>
      <View style={styles.fila_title}>
        <Text style={styles.title}>Falla {infoMonument.nombre}</Text>
        <Text style={styles.subtitle}>Sector: {infoMonument.sector}</Text>
        {

          infoMonument.visited &&
          <Text style={styles.subtitle}>
            Visitado {timeago(infoMonument.visited, 'es_ES')}
          </Text>
        }
      </View>
      <SafeAreaView>
        {/* INFO FALLA MAJOR */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.fila_property_seccion}>
            <Text style={styles.falla_property_seccion}>Falla Major</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Sección</Text>
            <Text style={[styles.falla_property_right_seccion, getBackgroundColor(infoMonument.seccion)]}>{infoMonument.seccion}</Text>
          </View>

          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Fallera</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.fallera ? "NO HAY" : infoMonument.fallera}</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Presidente</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.presidente ? "NO HAY" : infoMonument.presidente}</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Artista</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.artista ? "NO HAY" : infoMonument.artista}</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Lema</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.lema ? "NO HAY" : infoMonument.lema}</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Distintivo</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.distintivo ? "NO HAY" : infoMonument.distintivo}</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Año fundación</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.anyo_fundacion ? "NO HAY" : infoMonument.anyo_fundacion}</Text>
          </View>
          <View style={styles.containerImage}>
            <Image style={styles.image} source={{ uri: infoMonument.boceto }} />
          </View>

          {/* INFO FALLA INFANTIL */}
          <View style={styles.fila_property_seccion}>
            <Text style={styles.falla_property_seccion}>Falla Infantil</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Sección</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.seccion_i ? "NO HAY" : infoMonument.seccion_i}</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Fallera</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.fallera_i ? "NO HAY" : infoMonument.fallera_i}</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Presidente</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.presidente_i ? "NO HAY" : infoMonument.presidente_i}</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Artista</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.artista_i ? "NO HAY" : infoMonument.artista_i}</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Lema</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.lema_i ? "NO HAY" : infoMonument.lema_i}</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Distintivo</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.distintivo_i ? "NO HAY" : infoMonument.distintivo_i}</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Año fundación</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.anyo_fundacion_i ? "NO HAY" : infoMonument.anyo_fundacion_i}</Text>
          </View>
          <View style={styles.containerImage}>
          {!infoMonument.boceto_i ? "NO HAY" : <Image style={styles.image} source={{ uri: infoMonument.boceto_i }} />}
          </View>

          <View style={styles.fila_property_seccion}>
            <Text style={styles.falla_property_seccion}>Información servicio de bomberos</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Grupo protección S.B</Text>
            <Text style={styles.falla_property_right}>{!infoMonument.grpro ? "NO HAY" : infoMonument.grpro}</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Grupo inspección S.B</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.grpro ? "NO HAY" : infoMonument.grins}</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Requiere protección del S.B</Text>
            <Text style={styles.falla_property_right}> {literalProteccion}</Text>
          </View>
          <View style={styles.fila_property}>
            <Text style={styles.falla_property_left}>Orden de visita</Text>
            <Text style={styles.falla_property_right}> {!infoMonument.orden ? "NO HAY" : infoMonument.orden}</Text>
          </View>
          
        </ScrollView>
      </SafeAreaView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
    //alignItems: 'center',
    //justifyContent: 'center'
  },

  scrollView: {
    //backgroundColor: 'pink',
    //marginHorizontal: 20,
    marginBottom : 100,
    //paddingBottom:100,
  },
  image: {
    width: "100%",
    height: "100%",
    //resizeMode: 'contain', // Con esto hacemos unresize pero hay veces que se ve muy pequeno
    justifyContent: 'center',
    alignItems: 'center',

  },
  containerImage: {
    //justifyContent: 'center',
    alignItems: 'center',
    height: 600,
    //marginBottom: 10,
    marginTop: 10,

  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 2
  },
  subtitle: {
    color: colors.grey,
    fontSize: 14,
    textAlign: 'center',
    //marginBottom: 20,
    fontStyle: 'italic',
  },

  fila_title: {
    //borderBottomColor:colors.blue,
    //borderBottomWidth: 2,
    //marginBottom:2,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: colors.white,

  },
  falla_property: {
    fontSize: 20,
    //textAlign: "left",
  },
  falla_property_seccion: {
    color: colors.blue,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
  falla_property_left: {
    fontSize: 14,
    marginLeft: 20,
    fontWeight: "bold",
  },
  falla_property_right: {
    fontSize: 14,
    marginRight: 20,
  },
  falla_property_right_seccion: {
    fontSize: 14,
    marginRight: 20,
    borderWidth: 2,
    backgroundColor: 'pink',
    borderRadius: 4,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingLeft: 8,
    paddingRight: 8
  },
  fila_property: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop:2,

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
  seccion: {
    borderWidth: 2,
    backgroundColor: 'pink',
    borderRadius: 4,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingLeft: 8,
    paddingRight: 8
},
// GRIS
seccionE: {
    backgroundColor: '#dcdcdc',
    borderColor: '#a7a7a7',
},
// VERDE
seccion1A: {
    backgroundColor: '#98ff96',
    borderColor: '#5ccb5f',

},
seccion1B: {
    backgroundColor: '#009929',
    borderColor: '#005d16',
},
// AZUL
seccion2A: {
    backgroundColor: '#b9ffff',
    borderColor: '#81c9fa',
},
seccion2B: {
    backgroundColor: '#2196f3',
    borderColor: '#155db1',
},
// ROJO
seccion3A: {
    backgroundColor: '#ffa372',
    borderColor: '#ff6c3e',
},
seccion3B: {
    backgroundColor: '#ff0000',
    borderColor: '#b10005',
},
seccion3C: {
    backgroundColor: '#FC4F4F',
    borderColor: '#fe2323',
},
// AMARILLO
seccion4A: {
    backgroundColor: '#ffffa2',
    borderColor: '#ffff6a',
},
seccion4B: {
    backgroundColor: '#ffff00',
    borderColor: '#d6d604',
},
seccion4C: {
    backgroundColor: '#b7be00',
    borderColor: '#738000',
},
// NARANJA
seccion5A: {
    backgroundColor: '#ffcc50',
    borderColor: '#fbc43e',
},
seccion5B: {
    backgroundColor: '#ff9800',
    borderColor: '#e78b03',
},
seccion5C: {
    backgroundColor: '#d97715',
    borderColor: '#c66709',
},
// MORADO
seccion6A: {
    backgroundColor: '#f988ff',
    borderColor: '#ec57f4',
},
seccion6B: {
    backgroundColor: '#bc4ed8',
    borderColor: '#b831da',
},
seccion6C: {
    backgroundColor: '#ac33dc',
    borderColor: '#7f00b2',
},
// MARRON
seccion7A: {
    backgroundColor: '#ffb48a',
    borderColor: '#fca270',
},
seccion7B: {
    backgroundColor: '#c57d56',
    borderColor: '#c66835',
},
seccion7C: {
    backgroundColor: '#8d4925',
    borderColor: '#923c0e',
},
// TURQUESA
seccion8A: {
    backgroundColor: '#d5ffff',
    borderColor: '#b0f7f7',
},
seccion8B: {
    backgroundColor: '#9ce0db',
    borderColor: '#6aded5',
},
seccion8C: {
    backgroundColor: '#5dc1b9',
    borderColor: '#3ebcb2',
}
});

// Funcion para extraer el color de la seccion
const getBackgroundColor = seccion => {
  if (seccion === 'E') {
      return styles.seccionE
  }
  if (seccion === '1A') {
      return styles.seccion1A
  }
  if (seccion === '1B') {
      return styles.seccion1B
  }
  if (seccion === '2A') {
      return styles.seccion2A
  }
  if (seccion === '2B') {
      return styles.seccion2B
  }
  if (seccion === '3A') {
      return styles.seccion3A
  }
  if (seccion === '3B') {
      return styles.seccion3B
  }
  if (seccion === '3C') {
      return styles.seccion3C
  }
  if (seccion === '4A') {
      return styles.seccion4A
  }
  if (seccion === '4B') {
      return styles.seccion4B
  }
  if (seccion === '4C') {
      return styles.seccion4C
  }
  if (seccion === '5A') {
      return styles.seccion5A
  }
  if (seccion === '5B') {
      return styles.seccion5B
  }
  if (seccion === '5C') {
      return styles.seccion5C
  }
  if (seccion === '6A') {
      return styles.seccion6A
  }
  if (seccion === '6B') {
      return styles.seccion6B
  }
  if (seccion === '6C') {
      return styles.seccion6C
  }
  if (seccion === '7A') {
      return styles.seccion7A
  }
  if (seccion === '7B') {
      return styles.seccion7B
  }
  if (seccion === '7C') {
      return styles.seccion7C
  }
  if (seccion === '8A') {
      return styles.seccion8A
  }
  if (seccion === '8B') {
      return styles.seccion8B
  }
  if (seccion === '8C') {
      return styles.seccion8C
  }

};

export default Monument;