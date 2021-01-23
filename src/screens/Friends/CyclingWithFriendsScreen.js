import React, { useContext, useState, useEffect, Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, TextInputComponent, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import CyclingwithFriendContext from '../../context/CyclingwithFriendContext'
import AccountContext from '../../context/AccountContext'
import { Context as UserContext } from '../../context/UserContext'
import Header from '../../components/Header'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

const FreeCyclingStartScreen = ({navigation}) => {
    const {cycling, funct} = useContext(CyclingwithFriendContext)
    const [roomID, setRoomID] = useState(cycling.length + 1)
    const {data} = useContext(UserContext)
    const {account} = useContext(AccountContext)
    const [accountData, setAccountData] = useState(account[account.length-1])
    const [state, setState] = useState(false)
    const [hours, setHours] = useState('00')
    const [minutes, setMinutes] = useState('00')
    const [seconds, setSeconds] = useState('00')
    const [distance, setDistance] = useState('0')
    const [avg, setAvg] = useState('0')
    const win = Dimensions.get('window')
    var d = new Date();
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

    useEffect(()=>{
        funct.addPlayer(roomID, filterDataByUsername(accountData.username)[0].id, filterDataByUsername(accountData.username)[0].image, filterDataByUsername(accountData.username)[0].name, 0, 0, 0)
    }, [])

    const filterDataByID = (roomIDChosen) => {
        return cycling.filter(data => {
            return data.room_id === roomIDChosen
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
                    <Text style={styles.buttonFreeCycling}>Cycling with Friends</Text>
                </TouchableOpacity>
            </View>
            <Image style={styles.map} source={require('../../../assets/FreeCyclingMap.png')} />
            <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            >
                <View style={styles.detail}>
                    <TouchableOpacity onPress={() => {navigation.navigate('CyclingWithFriendsStart', {room_id: roomID, hours_start: d.getHours(), minutes_start: d.getMinutes()})}}>
                        <Text style={styles.buttonStart}>Start Cycling</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('CyclingWithFriendsStart')}}>
                        <Text style={styles.buttonLeave}>Leave Room</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <FlatList 
                        horizontal
                        data={filterDataByID(roomID)}
                        keyExtractor={user => user.id}
                        renderItem={({item}) => {
                            return (
                                <View style={styles.picBorder}>
                                    <Image style={styles.profilePic} source={{uri: item.image}} />
                                </View>
                            )
                        }}
                    />
                    <TouchableOpacity onPress={() => {navigation.navigate('InviteFriend', {room_id: roomID, data: cycling})}}>
                        <Image style={styles.profilePic} source={require('../../../assets/Add_User.png')} />
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
        backgroundColor: '#FBF199'
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
    buttonStart: {
        color: '#FDF9B7',
        backgroundColor: '#FF8E15',
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
    buttonLeave: {
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

export default FreeCyclingStartScreen