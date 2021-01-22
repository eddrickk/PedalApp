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

const BattleJoinScreen = ({navigation}) => {
    const {battle, funBattle} = useContext(CyclingBattleContext)
    const [room_id, setRoomID] = useState(0)
    const [code, setCode] = useState('')
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

    const initBattleJoin = () => {
        funBattle.addPlayer(room_id, code, 'open', false, true, filterDataByUsername(accountData.username)[0].id, 
        filterDataByUsername(accountData.username)[0].image, 
        filterDataByUsername(accountData.username)[0].name, 0, 0, 0)

        navigation.navigate('BattleLobby', {room_id: room_id, code: code})
    }
    
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#FBF199'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('CyclingBattle')}}>
                        <Ionicons name="chevron-back" size={24} color="#F3EFE4" />
                    </TouchableOpacity>
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
                    <View style={styles.codeContainer}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', flex: 1}}>Room ID </Text>
                            <TextInput 
                                style={styles.inputStyle}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType={'numeric'}
                                value={room_id}
                                onChangeText={(newRoom) => {setRoomID(parseInt(newRoom))}}
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', flex: 1}}>Code </Text>
                            <TextInput 
                                style={styles.inputStyle}
                                autoCapitalize="none"
                                autoCorrect={false}
                                maxLength={5}
                                value={code}
                                onChangeText={(newCode) => {setCode(newCode.toUpperCase())}}
                            />
                        </View>
                        
                    </View>
                    <TouchableOpacity onPress={() => initBattleJoin()}>
                        <Text style={styles.button}>Join Room</Text>
                        
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
    codeContainer: {
        backgroundColor: '#FFD8AD66',
        width: 300,
        borderRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    inputStyle: {
        alignSelf: 'center',
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: 'white',
        textAlignVertical: 'center',
        height: 30,
        width: 100,
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 10,
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

export default BattleJoinScreen