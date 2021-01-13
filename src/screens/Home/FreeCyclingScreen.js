import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, ImageBackground, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '../../components/Header'
const win = Dimensions.get('window');

const FreeCyclingScreen = ({ navigation }) => {
    const [hours, setHours] = useState('00')
    const [minutes, setMinutes] = useState('00')
    const [seconds, setSeconds] = useState('00')
    const [distance, setDistance] = useState('0')
    const [avg, setAvg] = useState('0')
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
                <Header title='Home' />
                
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
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
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
                <View style={styles.detail}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', width: win.width-140}}>
                        <View>
                            <Text style={styles.textStyle}>Time</Text>
                            <Text style={styles.textStyle}>Distance</Text>
                            <Text style={styles.textStyle}>Avg. Speed</Text>
                        </View>
                        <View>
                            <Text style={styles.textStyle}>{hours} : {minutes} : {seconds}</Text>
                            <Text style={styles.textStyle}>{distance} m</Text>
                            <Text style={styles.textStyle}>{avg} m/s</Text>
                        </View>
                        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.textStyle}>Time</Text>
                            <Text style={styles.textStyle}>00 : 00 : 02</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.textStyle}>Distance</Text>
                            <Text style={styles.textStyle}>1.0 m</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.textStyle}>Avg.Speed</Text>
                            <Text style={styles.textStyle}>0.5 m/s</Text>
                        </View> */}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    
    scrollView: {
        backgroundColor:'#F3EFE4'
    },
    
    textStyle: {
        fontSize: 24,
    },
    detail: {
        backgroundColor: '#F3EFE4',
        borderTopWidth: 3,
        borderTopColor: '#FF8E15',
        paddingVertical: 15
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
        height: 375,
        alignItems: 'center'
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
        height: 80,
        width: 80,
        alignSelf: 'center',
        marginLeft: 10
    },
    startBorder: {
        width: 150,
        height:150,
        borderColor: '#086788',
        borderRadius: 360,
        borderWidth: 5,
        backgroundColor: '#FBF199',
        marginTop:70,
        justifyContent: 'center'
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