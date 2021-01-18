import React, { useContext, useState, useEffect, Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, TextInputComponent, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '../../components/Header'
import CyclingwithFriendContext from '../../context/CyclingwithFriendContext'
import AccountContext from '../../context/AccountContext'
import { Context as UserContext } from '../../context/UserContext'
import CyclingHistoryContext from '../../context/CyclingHistoryContext'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

const CyclingWithFriendsStartScreen = ({navigation}) => {
    const room_id = navigation.getParam('room_id')
    const hours_start = navigation.getParam('hours_start')
    const minutes_start = navigation.getParam('minutes_start')
    const {cycling, funct} = useContext(CyclingwithFriendContext)
    const {data} = useContext(UserContext)
    const {account} = useContext(AccountContext)
    const [accountData, setAccountData] = useState(account[account.length-1])
    const {history, fun} = useContext(CyclingHistoryContext)
    const [hours, setHours] = useState(1)
    const [minutes, setMinutes] = useState(30)
    const [seconds, setSeconds] = useState(25)
    const [distance, setDistance] = useState(5401)
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
    const filterDataByID = () => {
        return cycling.filter(data => {
            return data.id !== filterDataByUsername(accountData.username)[0].id && data.room_id === room_id
        })
    }
    
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <Header title='Friends' />
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {navigation.navigate('SearchFriend')}}>
                    <Text style={styles.buttonSearch}>Search</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {navigation.navigate('CyclingWithFriends')}}>
                    <Text style={styles.buttonFreeCycling}>FreeCycling</Text>
                </TouchableOpacity>
            </View>
            <Image style={styles.map} source={require('../../../assets/FreeCyclingMap.png')} />
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                >
                <View style={styles.detail}>
                    <TouchableOpacity onPress={() => {
                        funct.editPlayer(room_id, filterDataByUsername(accountData.username)[0].id, filterDataByUsername(accountData.username)[0].image, 
                        filterDataByUsername(accountData.username)[0].name, (hours*3600 + minutes*60 + seconds), distance, distance/(hours*3600 + minutes*60 + seconds)), 
                        fun.addHistory(history.length+1, filterDataByUsername(accountData.username)[0].id, 'Cycling With Friends', (hours*3600 + minutes*60 + seconds), distance, 
                        distance/(hours*3600 + minutes*60 + seconds), weekday[d.getDay()], d.getDate(), d.getMonth()+1, d.getFullYear(), hours_start, d.getHours(), minutes_start, d.getMinutes()),
                        navigation.navigate('CyclingWithFriendsStop', {room_id: room_id})}}>
                        <Text style={styles.buttonStop}>Stop Cycling</Text>
                    </TouchableOpacity>
                    
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', width: win.width-50,
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
                        </View>
                    
                        <View style={{justifyContent: 'space-around', alignItem: 'center', marginLeft: 75, alignSelf: 'center', width: win.width-50, paddingTop: 10}}>
                        <FlatList 
                            horizontal
                            data={filterDataByID()}
                            keyExtractor={user => user.id}
                            renderItem={({item}) => {
                                return (
                                    <View style={{alignSelf: 'center'}}>
                                        <Text style={{fontSize: 18, color: '#FF8E15', fontWeight: 'bold'}}>{item.name}</Text>
                                        <Text style={styles.friendTextStyle}>{item.time} s</Text>
                                        <Text style={styles.friendTextStyle}>{(item.distance).toFixed(1)} m</Text>
                                        <Text style={styles.friendTextStyle}>{(item.avgspd).toFixed(2)} m/s</Text>
                                    </View>
                                )
                            }}
                        />
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    friendTextStyle: {
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

export default CyclingWithFriendsStartScreen