import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Dimensions, Alert } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Header from '../../components/Header'
import { Context as UserContext } from '../../context/UserContext'
import AccountContext from  '../../context/AccountContext'
import CyclingHistoryContext from '../../context/CyclingHistoryContext'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
const win = Dimensions.get('window');

const ShowCyclingHistoryScreen = ({navigation}) => {
    const history_id = navigation.getParam('history_id')
    const {data, editUser} = useContext(UserContext)
    const {account, func} = useContext(AccountContext)
    const {history, fun} = useContext(CyclingHistoryContext)
    const [accountData, setAccountData] = useState(account[account.length-1])
    var monthName = new Array(7);
    monthName[1] = "January";
    monthName[2] = "February";
    monthName[3] = "March";
    monthName[4] = "April";
    monthName[5] = "May";
    monthName[6] = "June";
    monthName[7] = "July";
    monthName[8] = "August";
    monthName[9] = "September";
    monthName[10] = "October";
    monthName[11] = "November";
    monthName[12] = "December";

    console.log(history_id)

    const filterDataByID = () => {
        return history.filter(data => {
            return data.history_id === history_id
        })
    }

    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#F3EFE4'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('CyclingHistory')}}>
                        <Ionicons name="chevron-back" size={24} color="#F3EFE4" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Cycling History</Text>
                    <Image style={styles.icon} source={require('../../../assets/icon.png')} />
                </View>

                <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                >
                    <FlatList 
                    data={filterDataByID()}
                    keyExtractor={history => history.history_id}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.historyContainer}>
                                <Text style={styles.activityStyle}>{item.activity}</Text>
                                <View style={styles.lineStyle}></View>
                                <View style={{marginVertical: 20, alignItems: 'center'}}>
                                    <Text style={styles.dateStyle}>{item.day}, {item.date} {monthName[item.month]} {item.year}</Text>
                                    <Text style={styles.dateStyle}>{item.hours_start}.{item.minutes_start} - {item.hours_end}.{item.minutes_end}</Text>
                                </View>
                                <Image style={styles.track} source={require('../../../assets/FreeCyclingMap.png')} />
                                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignSelf: 'center', width: win.width, marginTop: 10}}>
                                    <View>
                                        <Text style={styles.leftContent}>Time Spent</Text>
                                        <Text style={styles.leftContent}>Distance Travelled</Text>
                                        <Text style={styles.leftContent}>Avg. Speed</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.rightContent}>{Math.floor(item.time_spent/3600)} H {Math.floor((item.time_spent%3600)/60)} M {(item.time_spent%3600)%60} s</Text>
                                        <Text style={styles.rightContent}>{item.distance_travelled} m</Text>
                                        <Text style={styles.rightContent}>{item.average_speed.toFixed(2)} m/s</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('CyclingHistory')}>
                                    <Text style={styles.button}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        )
                        }}
                    />
                </ScrollView>
            </View>
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
    scrollView: {
        height: win.height,
        backgroundColor: '#FFD8AD'
    },
    historyContainer: {
        backgroundColor: '#F3EFE4',
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0,
        shadowRadius: 2,
        elevation: 3
    },
    leftContent: {
        color: '#086788',
        fontSize: 16,
    },
    rightContent: {
        color: '#086788',
        fontWeight: 'bold',
        fontSize: 16,
    },
    activityStyle: {
        color: '#086788',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5
    },
    lineStyle: {
        borderBottomColor: '#086788',
        borderBottomWidth: 3,
        width: win.width-60,
    },
    dateStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    track: {
        width: win.width-40,
        height: 200
    },
    button: {
        color: '#F3EFE4',
        backgroundColor: '#086788',
        fontWeight: 'bold',
        fontSize: 16,
        height: 35,
        width: 110,
        borderRadius: 12,
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

export default ShowCyclingHistoryScreen