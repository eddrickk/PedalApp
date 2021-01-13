import React, { useContext, useState, useEffect, Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, TextInputComponent, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '../../components/Header'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

const FreeCyclingStartScreen = ({navigation}) => {
    const [state, setState] = useState(false)
    const [hours, setHours] = useState('00')
    const [minutes, setMinutes] = useState('00')
    const [seconds, setSeconds] = useState('00')
    const [distance, setDistance] = useState('0')
    const [avg, setAvg] = useState('0')
    const win = Dimensions.get('window')
   /*  useEffect(async () => {
        let isLoaded = await Font.loadAsync({
            DoHyeon: require('../../assets/fonts/DoHyeon-Regular.ttf')
        })
    },[]
    )
       */  
    
    
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Header title='Home' />
                
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{
                        flex: 1,
                    }} onPress={() => {navigation.navigate('Search')}}>
                        <Text style={styles.buttonSearch}>Search</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={{
                        flex: 1,
                    }} onPress={() => {navigation.navigate('FreeCycling')}}>
                        <Text style={styles.buttonFreeCycling}>FreeCycling</Text>
                    </TouchableOpacity>
                </View>
                <Image style={styles.map} source={require('../../../assets/FreeCyclingMap.png')} />
                <View style={styles.detail}>
                    <TouchableOpacity onPress={() => {navigation.navigate('FreeCyclingStop')}}>
                        <Text style={styles.buttonStop}>Stop Cycling</Text>
                    </TouchableOpacity>
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
                    </View>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    scrollView: {
        backgroundColor: '#F3EFE4'
    },
    
    textStyle: {
        fontSize: 24,
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
    map: {
        height: 300,
    },
    detail: {
        backgroundColor: '#F3EFE4',
        borderTopWidth: 3,
        borderTopColor: '#FF8E15'
    },
    buttonStop: {
        color: '#FDF9B7',
        backgroundColor: '#084B83',
        fontWeight: 'bold',
        fontSize: 16,
        height: 45,
        width: 230,
        borderRadius: 17,
        alignSelf: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: -2
          },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5
    },
})

export default FreeCyclingStartScreen