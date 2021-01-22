import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Header from '../../components/Header'
import CyclingBattleContext from '../../context/CyclingBattleContext'
import AccountContext from '../../context/AccountContext'
import { Context as UserContext } from '../../context/UserContext'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import {Dimensions} from 'react-native'
const win = Dimensions.get('window');

const CyclingBattleScreen = ({navigation}) => {
    const {battle, funBattle} = useContext(CyclingBattleContext)
    const [roomID, setRoomID] = useState(battle.length + 1)
    const {data} = useContext(UserContext)
    const {account} = useContext(AccountContext)
    const [accountData, setAccountData] = useState(account[account.length-1])

    const filterDataByUsername = (usernameChosen) => {
        return data.filter(data => {
            return data.username.toLowerCase() === usernameChosen.toLowerCase()
        })
    }

    const initRandomBattle = () => {
        funBattle.addPlayer(roomID, 'RANDO', 'open', true, false, filterDataByUsername(accountData.username)[0].id, 
        filterDataByUsername(accountData.username)[0].image, 
        filterDataByUsername(accountData.username)[0].name, 0, 0, 0)

        funBattle.addPlayer(roomID, 'RANDO', 'open', false, false, filterDataByUsername("tonymyname")[0].id, 
        filterDataByUsername("tonymyname")[0].image, 
        filterDataByUsername("tonymyname")[0].name, 0, 0, 0)

        funBattle.addPlayer(roomID, 'RANDO', 'open', false, false, filterDataByUsername("lisamyname")[0].id, 
        filterDataByUsername("lisamyname")[0].image, 
        filterDataByUsername("lisamyname")[0].name, 0, 0, 0)

        funBattle.addPlayer(roomID, 'RANDO', 'open', false, false, filterDataByUsername("amazing_one")[0].id, 
        filterDataByUsername("amazing_one")[0].image, 
        filterDataByUsername("amazing_one")[0].name, 0, 0, 0)

        navigation.navigate('BattleLobby', {room_id: roomID, code: 'RANDO'})
    }

    useEffect(()=>{
        setRoomID(battle.length+1)
    }, [battle])

    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#FBF199'}}>
                <Header title='Cycling Battle' />

                <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                >
                    <ImageBackground
                    source={require('../../../assets/cyclingBattleBg.png')}
                    style={styles.cyclingBackground}
                    >
                        <TouchableOpacity onPress={() => initRandomBattle()}>
                            <Text style={styles.button}>Random Battle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('BattleCreate', {room_id: roomID})}>
                            <Text style={styles.button}>Create Room</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('BattleJoin')}>
                            <Text style={styles.button}>Join Room</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputStyle:{
        marginHorizontal:10,
        borderWidth:3,
        borderColor:'#F3EFE4',
        borderRadius:15,
        margin:10,
        backgroundColor:'white',
        paddingLeft :10
    },
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor:'#FBF199'
    },
    cyclingBackground: {
        alignSelf: 'center',
        width: win.width,
        height: win.height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonSearch: {
        color: '#086788',
        backgroundColor: '#FFD8AD',
        fontWeight: 'bold',
        fontSize: 16,
        height: 40,
        borderBottomLeftRadius: 12,
        textAlignVertical: 'center',
        textAlign: 'center',
        shadowOffset: {
            width: 1,
            height: -2
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5
    },
    buttonFreeCycling: {
        color: '#F3EFE4',
        backgroundColor: '#FF8E15',
        fontSize: 16,
        height: 40,
        borderBottomRightRadius: 12,
        textAlignVertical: 'center',
        textAlign: 'center',
        shadowOffset: {
            width: 1,
            height: -2
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5
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
})

export default CyclingBattleScreen