import AsyncStorage from '@react-native-async-storage/async-storage'
import { format, register } from 'timeago.js';

async function setFallaAsVisited(fallaId) {
    console.log(`Set falla as visited ${fallaId}`)
    const visitadosJSON = await AsyncStorage.getItem('visitados')
    
    let currentDatetime = new Date()

    let visitadosObj = {}
    if (visitadosJSON) {
        visitadosObj = JSON.parse(visitadosJSON)
        visitadosObj[fallaId] = currentDatetime.toISOString()
    } else {
        visitadosObj[fallaId] = currentDatetime.toISOString()
    }

    await AsyncStorage.setItem('visitados', JSON.stringify(visitadosObj))
    return visitadosObj

}


async function getVisitedFallas() {
   
    const visitadosJSON = await AsyncStorage.getItem('visitados')

    let visitadosObj = {}
    if (visitadosJSON) {
        visitadosObj = JSON.parse(visitadosJSON)
    }

    return visitadosObj

}

function distanceBetween2Points(lat1, lon1, lat2, lon2) {
    const φ1 = lat1 * Math.PI/180, φ2 = lat2 * Math.PI/180, Δλ = (lon2-lon1) * Math.PI/180;
    const R = 6371e3
    // retorna la distancia en metros
    const d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;
    return d/1000;
}

register('es_ES', (number, index, total_sec) => [
    ['justo ahora', 'ahora mismo'],
    ['hace %s segundos', 'en %s segundos'],
    ['hace 1 minuto', 'en 1 minuto'],
    ['hace %s minutos', 'en %s minutos'],
    ['hace 1 hora', 'en 1 hora'],
    ['hace %s horas', 'in %s horas'],
    ['hace 1 dia', 'en 1 dia'],
    ['hace %s dias', 'en %s dias'],
    ['hace 1 semana', 'en 1 semana'],
    ['hace %s semanas', 'en %s semanas'],
    ['1 mes', 'en 1 mes'],
    ['hace %s meses', 'en %s meses'],
    ['hace 1 año', 'en 1 año'],
    ['hace %s años', 'en %s años']
][index]);

const timeago = datetime => format(datetime, 'es_ES');


export {
    setFallaAsVisited,
    getVisitedFallas,
    distanceBetween2Points,
    timeago
}