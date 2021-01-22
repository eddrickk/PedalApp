import React, { useContext, useState, useEffect, Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, TextInputComponent, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import AccountContext from '../../context/AccountContext'
import { Context as UserContext } from '../../context/UserContext'
import CyclingHistoryContext from '../../context/CyclingHistoryContext'
import Header from '../../components/Header'
// import * as Font from 'expo-font'
// import AppLoading from 'expo-app-loading'

const FreeCyclingStartScreen = ({navigation}) => {
    const hours_start = navigation.getParam('hours_start')
    const minutes_start = navigation.getParam('minutes_start')
    const {data, editUser} = useContext(UserContext)
    const {account} = useContext(AccountContext)
    const [accountData, setAccountData] = useState(account[account.length-1])
    const {history, fun} = useContext(CyclingHistoryContext)
    const [state, setState] = useState(false)
    const [hours, setHours] = useState(1)
    const [minutes, setMinutes] = useState(24)
    const [seconds, setSeconds] = useState(30)
    const [distance, setDistance] = useState(5316)
    const [avg, setAvg] = useState((distance/(hours*3600 + minutes*60 + seconds)).toFixed(2))
    const win = Dimensions.get('window')
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
   /*  useEffect(async () => {
        let isLoaded = await Font.loadAsync({
            DoHyeon: require('../../assets/fonts/DoHyeon-Regular.ttf')
        })
    },[]
    )
       */  
    const filterDataByUsername = (usernameChosen) => {
        return data.filter(data => {
            return data.username.toLowerCase() === usernameChosen.toLowerCase()
        })
    }
    
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
                    <TouchableOpacity onPress={() => {fun.addHistory(history.length+1, filterDataByUsername(accountData.username)[0].id, 'Free Cycling', (hours*3600 + minutes*60 + seconds), distance, 
                        distance/(hours*3600 + minutes*60 + seconds), weekday[d.getDay()], d.getDate(), d.getMonth()+1, d.getFullYear(), hours_start, d.getHours(), minutes_start, d.getMinutes()), 
                        editUser(filterDataByUsername(accountData.username)[0].id, filterDataByUsername(accountData.username)[0].image, filterDataByUsername(accountData.username)[0].name, 
                        filterDataByUsername(accountData.username)[0].username, filterDataByUsername(accountData.username)[0].email, filterDataByUsername(accountData.username)[0].password, 
                        filterDataByUsername(accountData.username)[0].phone, filterDataByUsername(accountData.username)[0].time_spent + (hours*3600 + minutes*60 + seconds), 
                        filterDataByUsername(accountData.username)[0].distance_travelled + distance, filterDataByUsername(accountData.username)[0].average_speed + distance/(hours*3600 + minutes*60 + seconds),
                        filterDataByUsername(accountData.username)[0].battle_wins, filterDataByUsername(accountData.username)[0].battle_draws, filterDataByUsername(accountData.username)[0].battle_loses, 
                        filterDataByUsername(accountData.username)[0].friends_number),
                        navigation.navigate('FreeCyclingStop', {time_spent: (hours*3600 + minutes*60 + seconds), distance_travelled: distance, average_speed: distance/(hours*3600 + minutes*60 + seconds)})}}>
                        <Text style={styles.buttonStop}>Stop Cycling</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', width: win.width-30}}>
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