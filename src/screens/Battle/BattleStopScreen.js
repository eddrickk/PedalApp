import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Dimensions, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import CyclingwithFriendContext from '../../context/CyclingwithFriendContext'
import AccountContext from '../../context/AccountContext'
import CyclingBattleContext from '../../context/CyclingBattleContext'
import { Context as UserContext } from '../../context/UserContext'
import Header from '../../components/Header'
const win = Dimensions.get('window')

const BattleStopScreen = ({navigation}) => {
    const room_id = navigation.getParam('room_id')
    const {cycling, funct} = useContext(CyclingwithFriendContext)
    const {data} = useContext(UserContext)
    const {account} = useContext(AccountContext)
    const [accountData, setAccountData] = useState(account[account.length-1])
    const {battle, funBattle} = useContext(CyclingBattleContext)
    
    const filterDataByUsername = (usernameChosen) => {
        return data.filter(data => {
            return data.username.toLowerCase() === usernameChosen.toLowerCase()
        })
    }

    const filterData = () => {
        return battle.filter(data => {
            return data.room_id === room_id
        })
    }

    const winner = (state) => {
        if (state){
            return 'https://www.iconsdb.com/icons/preview/color/FF8E15/crown-5-xxl.png'
        }
        return 'https://www.iconsdb.com/icons/preview/color/F3EFE4/crown-5-xxl.png'
    }

    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <Header title='Cycling Battle' />
            <ImageBackground
                    source={require('../../../assets/cyclingBattleBg.png')}
                    style={styles.cyclingBackground} imageStyle={{opacity: 0.6}}
                    >
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.detail}>
                        <View style={styles.info}>
                            <Text style={{fontSize: 20, alignSelf: 'center'}}>Battle Finished</Text>
                        </View>
                        
                        <View style={styles.players}>
                            <Text style={{fontSize: 18, marginBottom: 10, fontWeight: 'bold', marginHorizontal: 10}}>Result</Text>
                            <FlatList 
                                vertical
                                data={filterData().sort((a,b) => a.time > b.time ? 1 : -1)}
                                keyExtractor={user => user.id}
                                renderItem={({item}) => {
                                    return (
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginHorizontal: 10}}>
                                            <Image style={{width: 20, height: 20, marginHorizontal: 10}} source={{uri: winner(item.winner)}} />
                                            <Image style={{width: 50, height: 50, marginHorizontal: 10}} source={{uri: item.image}} />
                                            <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold', marginHorizontal: 10, flex: 1}}>{item.name} </Text>
                                            <Text style={{fontSize: 10, color: 'black', fontWeight: 'bold', width: 20, height: 20, marginHorizontal: 10, flex: 1}}>
                                                {Math.floor(item.time/3600)} H {Math.floor((item.time%3600)/60)} M {(item.time%3600)%60} s
                                            </Text>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                            <TouchableOpacity onPress={() => {navigation.navigate('CyclingBattle')}}>
                                <Text style={styles.buttonBreak}>Break</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {navigation.navigate()}}>
                                <Image style={styles.shareicon} source={require('../../../assets/Share_Blue.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    
    detail: {
        alignSelf: 'center'
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cyclingBackground: {
        alignSelf: 'center',
        width: win.width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
        backgroundColor: '#F3EFE4',
        width: 300,
        height: 70,
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    buttonBreak: {
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
        marginRight: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: -2
          },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
    },
    shareicon: {
        height: 50,
        width: 50,
    },
    players: {
        backgroundColor: '#FFD8AD66',
        width: 300,
        borderRadius: 30,
        paddingVertical: 20,
    },
})

export default BattleStopScreen