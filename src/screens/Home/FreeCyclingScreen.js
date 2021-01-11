import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, ImageBackground, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
const win = Dimensions.get('window');

const FreeCyclingScreen = ({ navigation }) => {
    const [hours, setHours] = useState('00')
    const [minutes, setMinutes] = useState('00')
    const [seconds, setSeconds] = useState('00')
    const [distance, setDistance] = useState('0')
    const [avg, setAvg] = useState('0')
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <Text style={styles.headerText}>Home</Text>
                    <Image style={styles.icon} source={require('../../../assets/icon.png')} />
                </View>
                
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{
                        flex: 1,
                    }} onPress={() => {navigation.navigate('Search')}}>
                        <Text style={styles.buttonSearch}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 1,
                    }} onPress={() => {navigation.navigate('freeCyclingFlow')}}>
                        <Text style={styles.buttonFreeCycling}>FreeCycling</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ImageBackground
                        source={require('../../../assets/cycling.png')}
                        style={styles.cyclingBackground} imageStyle={{ opacity: 0.4 }}
                    >
                        <TouchableOpacity onPress={() => { navigation.navigate('FreeCyclingStart') }}>
                            <View style={styles.startBorder} >
                                <Image style={styles.startIcon} source={require('../../../assets/play.png')} />
                            </View>
                        </TouchableOpacity> 
                        <Text style={styles.startText}>Start Free Cycling</Text>
                    </ImageBackground>
                </View>
                <View style={styles.greyBackground} >
                    <Text style={styles.resultText} > Time               {hours}:{minutes}:{hours}</Text>
                    <Text style={styles.resultText} > Distance        {distance}m</Text>
                    <Text style={styles.resultText} > Avg. Speed   {avg}m/s</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF8E15',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 20,
        color: '#F3EFE4',
        marginLeft: 10
    },
    icon: {
        height: 50,
        width: 50,
    },
    buttonFreeCycling: {
        color: '#086788',
        backgroundColor: '#FFD8AD',
        fontWeight: 'bold',
        fontSize: 16,
        height: 40,
        borderBottomRightRadius: 12,
        textAlignVertical: 'center',
        textAlign: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: -2
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5
    },
    buttonSearch: {
        color: '#F3EFE4',
        backgroundColor: '#FF8E15',
        fontSize: 16,
        height: 40,
        borderBottomLeftRadius: 12,
        textAlignVertical: 'center',
        textAlign: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: -2
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5
    },
    cyclingBackground: {
        alignSelf: 'center',
        width: win.width,
        flex: 1,
        height: 375,
    },
    startText: {
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
        color: '#086788',
        textShadowColor: '#FDF9B7',
        textShadowOffset: {
            height: 1,
            width: 1
        },
        textShadowRadius:5
    },
    startIcon: {
        alignSelf: 'center',
        height: 60,
        width: 60,
        alignContent: 'center'
    },
    startBorder: {
        width: 150,
        height:150,
        alignSelf: 'center',
        borderColor: '#086788',
        borderRadius: 360,
        borderWidth: 5,
        backgroundColor: '#FBF199',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop:70
    },
    greyBackground: {
        backgroundColor: '#F3EFE4',
        height: 685,
        borderBottomColor: '#FF8E15',
        borderBottomWidth: win.width
    },
    resultText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 60,
        marginTop:35
    }
})

export default FreeCyclingScreen