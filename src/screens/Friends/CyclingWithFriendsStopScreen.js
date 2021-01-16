import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Context as CyclingContext } from '../../context/CyclingwithFriendContext'
import { Context as UserContext } from '../../context/UserContext'
import Header from '../../components/Header'
const win = Dimensions.get('window')

const CyclingWithFriendsStopScreen = ({navigation}) => {
    const room_id = navigation.getParam('room_id')
    const {data, addPlayer, editPlayer} = useContext(CyclingContext)
    const [hours, setHours] = useState('00')
    const [minutes, setMinutes] = useState('00')
    const [seconds, setSeconds] = useState('00')
    const [distance, setDistance] = useState('0')
    const [avg, setAvg] = useState('0')
    
    const filterDataByID = (roomIDChosen, idChosen) => {
        return data.filter(data => {
            return data.room_id === roomIDChosen && data.id === idChosen
        })
    }
    const filterFriendData = (roomIDChosen, idChosen) => {
        return data.filter(data => {
            return data.room_id === roomIDChosen && data.id !== idChosen
        })
    }
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            
                <Header title='Friends' />
                
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{
                        flex: 1,
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 1,
                            height: -2
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 5
                    }} onPress={() => {navigation.navigate('SearchFriend')}}>
                        <Text style={styles.buttonSearch}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 1,
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 1,
                            height: -2
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 5
                    }} onPress={() => {navigation.navigate('CyclingWithFriends')}}>
                        <Text style={styles.buttonFreeCycling}>FreeCycling</Text>
                    </TouchableOpacity>
                </View>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.detail}>
                    <Text style={{fontSize: 24, fontWeight: 'bold', alignSelf: 'center', marginVertical: 30}}>Cycling Ended</Text>
                    <Text style={{fontSize: 18, alignSelf: 'center', marginBottom: 10}}>Result</Text>
                    <FlatList 
                        horizontal
                        data={filterDataByID(room_id, 5)}
                        keyExtractor={user => user.id}
                        renderItem={({item}) => {
                            return (
                                <View style={styles.resultStyle}>
                                    <View>
                                        <Text style={styles.textStyle}>Time Spent</Text>
                                        <Text style={styles.textStyle}>Distance Travelled</Text>
                                        <Text style={styles.textStyle}>Avg. Speed</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.friendTextStyle}>{Math.floor(item.time/3600)} H {Math.floor((item.time%3600)/60)} M {(item.time%3600)%60} s</Text>
                                        <Text style={styles.friendTextStyle}>{item.distance} m</Text>
                                        <Text style={styles.friendTextStyle}>{(item.avgspd).toFixed(2)} m/s</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                    <FlatList 
                        horizontal
                        data={filterFriendData(room_id, 5)}
                        keyExtractor={user => user.id}
                        renderItem={({item}) => {
                            return (
                                <View style={styles.resultFriendStyle}>
                                    <View>
                                        <Text style={{fontSize: 20, color: '#FF8E15', fontWeight: 'bold'}}>{item.name}</Text>
                                        <Text style={styles.friendTextStyle}>{Math.floor(item.time/3600)} H {Math.floor((item.time%3600)/60)} M {(item.time%3600)%60} s</Text>
                                        <Text style={styles.friendTextStyle}>{item.distance} m</Text>
                                        <Text style={styles.friendTextStyle}>{(item.avgspd).toFixed(2)} m/s</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                        <TouchableOpacity onPress={() => {navigation.navigate('Search')}}>
                            <Text style={styles.buttonBreak}>Back to Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate()}}>
                            <Image style={styles.shareicon} source={require('../../../assets/Share_Blue.png')} />
                        </TouchableOpacity>
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
    
    detail: {
        alignSelf: 'center'
    },
    resultStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        width: win.width,
        borderTopColor: '#FF8E15',
        borderTopWidth: 1,
        borderBottomColor: '#FF8E15',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    resultFriendStyle: {
        flexDirection: 'row',
        marginLeft: 20,
        paddingVertical: 10
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    friendTextStyle: {
        fontSize: 20,
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
    },
    buttonSearch: {
        color: '#F3EFE4',
        backgroundColor: '#FF8E15',
        fontSize: 16,
        height: 40,
        borderBottomLeftRadius: 12,
        textAlignVertical: 'center',
        textAlign: 'center',
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
})

export default CyclingWithFriendsStopScreen