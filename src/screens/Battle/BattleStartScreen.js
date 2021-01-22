import React, { useContext, useState, useEffect, Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, TextInputComponent, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '../../components/Header'
import CyclingBattleContext from '../../context/CyclingBattleContext'
import AccountContext from '../../context/AccountContext'
import { Context as UserContext } from '../../context/UserContext'
import CyclingHistoryContext from '../../context/CyclingHistoryContext'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'


const BattleStartScreen = ({navigation}) => {
    const room_id = navigation.getParam('room_id')
    const code = navigation.getParam('code')
    const hours_start = navigation.getParam('hours_start')
    const minutes_start = navigation.getParam('minutes_start')
    const {battle, funBattle} = useContext(CyclingBattleContext)
    const {data, editUser} = useContext(UserContext)
    const {account} = useContext(AccountContext)
    const [accountData, setAccountData] = useState(account[account.length-1])
    const {history, fun} = useContext(CyclingHistoryContext)
    const [hours, setHours] = useState(1)
    const [minutes, setMinutes] = useState(30)
    const [seconds, setSeconds] = useState(25)
    const [distance, setDistance] = useState(10002)
    const [avg, setAvg] = useState((distance/(hours*3600 + minutes*60 + seconds)).toFixed(2))
    const win = Dimensions.get('window')
    var x = 2
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
    console.log(hours_start, minutes_start, room_id)
    console.log(battle)
    const filterDataByUsername = (usernameChosen) => {
        return data.filter(data => {
            return data.username.toLowerCase() === usernameChosen.toLowerCase()
        })
    }
    const filterAccDataByID = (IDChosen) => {
        return data.filter(data => {
            return data.id === IDChosen
        })
    }
    const filterAccData = () => {
        return battle.filter(data => {
            return data.id === filterDataByUsername(accountData.username)[0].id && data.room_id === room_id
        })
    }
    const filterDataByID = () => {
        return battle.filter(data => {
            return data.id !== filterDataByUsername(accountData.username)[0].id && data.room_id === room_id
        })
    }
    const filterData = () => {
        return battle.filter(data => {
            return data.room_id === room_id
        })
    }

    const getFirstPlace = () => {
        const dataForFirstPlace = filterData().sort((a,b) => a.distance < b.distance ? 1 : -1)
        return dataForFirstPlace[0].name
    }
    const getFirstPlaceID = () => {
        const dataForFirstPlace = filterData().sort((a,b) => a.distance < b.distance ? 1 : -1)
        return dataForFirstPlace[0].id
    }

    const initBattleEnd = (firstPlaceID) => {
        if (filterAccDataByID(firstPlaceID)[0].username === accountData.username){
            funBattle.editPlayer(room_id, filterAccData().code, 'closed', filterAccData().room_master, true, filterAccData().id, 
            filterAccData().image, 
            filterAccData().name, filterAccData().time, filterAccData().distance, filterAccData().avgspd)

            fun.addHistory(history.length+1, filterDataByUsername(accountData.username)[0].id, 'Cycling Battle (Win)', (hours*3600 + minutes*60 + seconds), distance, 
            distance/(hours*3600 + minutes*60 + seconds), weekday[d.getDay()], d.getDate(), d.getMonth()+1, d.getFullYear(), hours_start, d.getHours(), minutes_start, d.getMinutes())
        
            editUser(filterDataByUsername(accountData.username)[0].id, filterDataByUsername(accountData.username)[0].image, filterDataByUsername(accountData.username)[0].name, 
            filterDataByUsername(accountData.username)[0].username, filterDataByUsername(accountData.username)[0].email, filterDataByUsername(accountData.username)[0].password, 
            filterDataByUsername(accountData.username)[0].phone, filterDataByUsername(accountData.username)[0].time_spent + (hours*3600 + minutes*60 + seconds), 
            filterDataByUsername(accountData.username)[0].distance_travelled + distance, filterDataByUsername(accountData.username)[0].average_speed + distance/(hours*3600 + minutes*60 + seconds),
            filterDataByUsername(accountData.username)[0].battle_wins + 1, filterDataByUsername(accountData.username)[0].battle_draws, filterDataByUsername(accountData.username)[0].battle_loses, 
            filterDataByUsername(accountData.username)[0].friends_number)
        }
        else{
            funBattle.editPlayer(room_id, filterAccData().code, 'closed', false, filterAccData().room_master, filterAccData().id, 
            filterAccData().image, 
            filterAccData().name, filterAccData().time, filterAccData().distance, filterAccData().avgspd)

            fun.addHistory(history.length+1, filterDataByUsername(accountData.username)[0].id, 'Cycling Battle (Lose)', (hours*3600 + minutes*60 + seconds), distance, 
            distance/(hours*3600 + minutes*60 + seconds), weekday[d.getDay()], d.getDate(), d.getMonth()+1, d.getFullYear(), hours_start, d.getHours(), minutes_start, d.getMinutes())
        
            editUser(filterDataByUsername(accountData.username)[0].id, filterDataByUsername(accountData.username)[0].image, filterDataByUsername(accountData.username)[0].name, 
            filterDataByUsername(accountData.username)[0].username, filterDataByUsername(accountData.username)[0].email, filterDataByUsername(accountData.username)[0].password, 
            filterDataByUsername(accountData.username)[0].phone, filterDataByUsername(accountData.username)[0].time_spent + (hours*3600 + minutes*60 + seconds), 
            filterDataByUsername(accountData.username)[0].distance_travelled + distance, filterDataByUsername(accountData.username)[0].average_speed + distance/(hours*3600 + minutes*60 + seconds),
            filterDataByUsername(accountData.username)[0].battle_wins, filterDataByUsername(accountData.username)[0].battle_draws, filterDataByUsername(accountData.username)[0].battle_loses + 1, 
            filterDataByUsername(accountData.username)[0].friends_number)
        }
    }

    useEffect(()=>{
        for (let battleData of filterDataByID()){
            var randomDistance = Math.floor(Math.random() * 10000) + 1
            var randomTime = Math.floor(Math.random() * 10) + 5426
            funBattle.editPlayer(room_id, battleData.code, 'closed', battleData.winner, battleData.room_master, battleData.id, 
            battleData.image, 
            battleData.name, randomTime, randomDistance, randomDistance/randomTime)
        }
    }, [])
    
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <Header title='Cycling Battle' />
            <Image style={styles.map} source={require('../../../assets/Track.png')} />
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                >
                <View style={styles.detail}>
                    <Text style={styles.titleTextStyle}>Standings</Text>
                    {/* <View style={{flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', width: win.width-50,
                    paddingBottom: 10, borderBottomColor: '#FF8E15', borderBottomWidth: 1}}>
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
                    </View> */}
                    <Text style={styles.textStyle}>1. {filterDataByUsername(accountData.username)[0].name} - {distance.toFixed(1)} m</Text>
                    
                    <FlatList 
                        vertical
                        data={filterDataByID().sort((a,b) => a.distance < b.distance ? 1 : -1)}
                        keyExtractor={user => user.id}
                        renderItem={({item}) => {
                            return (
                                <Text style={styles.textStyle}>{x++}. {item.name} - {(item.distance).toFixed(1)} m</Text>
                            )
                        }}
                    />
                    <View style={{marginVertical: 10}}>
                        <Text style={{color: '#EB5757', fontWeight: 'bold'}}>{getFirstPlace()} is currently in the Lead!</Text>
                        <Text style={{color: '#EB5757', fontWeight: 'bold'}}>0m left to go</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        initBattleEnd(getFirstPlaceID()),
                        navigation.navigate('BattleStop', {room_id: room_id})}}>
                        <Text style={styles.buttonStop}>Stop Cycling</Text>
                    </TouchableOpacity>
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
    
    titleTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
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
        height: 250,
    },
    detail: {
        backgroundColor: '#F3EFE4',

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
        marginBottom: 10,
        marginTop: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: -2
          },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5
    },
    picBorder: {
        borderRadius: 360,
    },
    profilePic: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 20
    },
})

export default BattleStartScreen