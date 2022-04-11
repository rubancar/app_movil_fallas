import AsyncStorage from '@react-native-async-storage/async-storage'


async function setFallaAsVisited(fallaId) {
    console.log(`Set falla as visited ${fallaId}`)
    const visitadosJSON = await AsyncStorage.getItem('visitados')

    let visitadosObj = {}
    if (visitadosJSON) {
        visitadosObj = JSON.parse(visitadosJSON)
        console.log(`visitadosObj ${visitadosObj}`)
        visitadosObj[fallaId] = true
    } else {
        visitadosObj[fallaId] = true
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


export {
    setFallaAsVisited,
    getVisitedFallas
}