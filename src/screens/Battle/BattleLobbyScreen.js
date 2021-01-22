import React, { useContext, useState, useEffect, Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, ImageBackground, TextInputComponent, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '../../components/Header'
import CyclingwithFriendContext from '../../context/CyclingwithFriendContext'
import CyclingBattleContext from '../../context/CyclingBattleContext'
import AccountContext from '../../context/AccountContext'
import { Context as UserContext } from '../../context/UserContext'
import CyclingHistoryContext from '../../context/CyclingHistoryContext'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
const win = Dimensions.get('window')

const BattleLobbyScreen = ({navigation}) => {
    const newMap = navigation.getParam('newMap')
    const {battle, funBattle} = useContext(CyclingBattleContext)
    const room_id = navigation.getParam('room_id')
    const code = navigation.getParam('code')
    const {data} = useContext(UserContext)
    const {account} = useContext(AccountContext)
    const [accountData, setAccountData] = useState(account[account.length-1])
    const [map, setMap] = useState('')
    var d = new Date();
   /*  useEffect(async () => {
        let isLoaded = await Font.loadAsync({
            DoHyeon: require('../../assets/fonts/DoHyeon-Regular.ttf')
        })
    },[]
    )
       */
    console.log(battle)
    console.log(room_id)

    const filterDataByUsername = (usernameChosen) => {
        return data.filter(data => {
            return data.username.toLowerCase() === usernameChosen.toLowerCase()
        })
    }
    const filterDataByID = () => {
        return battle.filter(data => {
            return data.room_id === room_id && data.code === code
        })
    }
    const filterDataByUserID = () => {
        return battle.filter(data => {
            return data.room_id === room_id && data.code === code && data.id === filterDataByUsername(accountData.username)[0].id
        })
    }

    const initBattleStart = () => {
        funBattle.editPlayer(room_id, filterDataByUserID()[0].code, 'closed', filterDataByUserID()[0].room_master, false, filterDataByUsername(accountData.username)[0].id, 
        filterDataByUsername(accountData.username)[0].image, 
        filterDataByUsername(accountData.username)[0].name, 5425, 10002, 10002/5425)

        navigation.navigate('BattleStart', {room_id: room_id, code: code, hours_start: d.getHours(), minutes_start: d.getMinutes()})
    }

    useEffect(()=>{
        if (map === '')
            setMap('Green Peach Hill')
        else
            setMap(newMap)
    }, [newMap])

    const roomMaster = (state) => {
        if (state){
            return 'https://www.iconsdb.com/icons/preview/color/FF8E15/crown-5-xxl.png'
        }
        return 'https://www.iconsdb.com/icons/preview/color/F3EFE4/crown-5-xxl.png'
    }
    
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#FBF199'}}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Cycling Battle</Text>
                    <Image style={styles.icon} source={require('../../../assets/icon.png')} />
                </View>
            </View>
            <ImageBackground
                    source={require('../../../assets/cyclingBattleBg.png')}
                    style={styles.cyclingBackground} imageStyle={{opacity: 0.6}}
                    >
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    >
                    <TouchableOpacity style={styles.mapChosen} onPress={() => {navigation.navigate('BattleMap')}}>
                        <Image style={{width: 20, height: 20}} source={require('../../../assets/Map_Marker.png')} />
                        <Text style={styles.textStyle}>{map}</Text>
                    </TouchableOpacity>
                    <View style={styles.players}>
                        <FlatList 
                            vertical
                            data={filterDataByID()}
                            keyExtractor={user => user.id}
                            renderItem={({item}) => {
                                return (
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginHorizontal: 10}}>
                                        <Image style={{width: 20, height: 20, marginHorizontal: 10}} source={{uri: roomMaster(item.room_master)}} />
                                        <Image style={{width: 50, height: 50, marginHorizontal: 10}} source={{uri: item.image}} />
                                        <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold', marginHorizontal: 10, flex: 1}}>{item.name}</Text>
                                        <Image style={{width: 20, height: 20, marginHorizontal: 10}} source={{uri: 'https://www.iconsdb.com/icons/preview/color/086788/circle-dashed-6-xxl.png'}} />
                                    </View>
                                )
                            }}
                        />
                    </View>
                    <TouchableOpacity onPress={() => initBattleStart()}>
                        <Text style={styles.button}>Ready</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF8E15',
        justifyContent: 'space-between',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0,
        shadowRadius: 8,
        elevation: 8
    },
    headerText: {
        fontSize: 26,
        color: '#F3EFE4',
        marginLeft:10
    },
    icon: {
        height: 50,
        width: 50,
    },
    cyclingBackground: {
        alignSelf: 'center',
        width: win.width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapChosen: {
        flexDirection: 'row',
        backgroundColor: '#F3EFE4',
        width: 300,
        height: 50,
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    textStyle: {
        fontWeight: 'bold',
        marginLeft: 10
    },
    players: {
        backgroundColor: '#FFD8AD66',
        width: 300,
        borderRadius: 30,
        paddingVertical: 20,
    },
    friendTextStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        color: '#FDF9B7',
        backgroundColor: '#084B83',
        fontWeight: 'bold',
        fontSize: 16,
        height: 45,
        width: 150,
        borderRadius: 12,
        alignSelf: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginVertical: 10,
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

export default BattleLobbyScreen