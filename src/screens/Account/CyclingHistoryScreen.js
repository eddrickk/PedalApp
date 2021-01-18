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

const CyclingHistoryScreen = ({navigation}) => {
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
    console.log(history)

    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#F3EFE4'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Account')}}>
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
                    data={history}
                    keyExtractor={history => history.history_id}
                    renderItem={({item}) => {
                        return (
                            <>
                                <TouchableOpacity onPress={() => {navigation.navigate('ShowCyclingHistory', {history_id: item.history_id})}}>
                                    <View style={styles.historyContainer}>
                                        <View style={styles.leftContent}>
                                            <Text style={{fontWeight: 'bold', fontSize: 12, marginVertical: 5}}>{item.date} {monthName[item.month].substring(0,3)} {item.year}</Text>
                                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                                <View>
                                                    <Text style={styles.dayStyle}>{item.day.substring(0,1).toUpperCase()}</Text>
                                                    <Text style={styles.dayStyle}>{item.day.substring(1,2).toUpperCase()}</Text>
                                                    <Text style={styles.dayStyle}>{item.day.substring(2,3).toUpperCase()}</Text>
                                                </View>
                                                <View style={{flex: 1, alignItems: 'center'}}>
                                                    <Text style={styles.activityStyle}>{item.activity}</Text>
                                                </View>
                                                
                                            </View>
                                        </View>
                                        <View style={styles.rightContent}>
                                            <Text style={styles.timeStyle}>{item.hours_start}.{item.minutes_start}</Text>
                                            <Text style={styles.timeStyle}> - </Text>
                                            <Text style={styles.timeStyle}>{item.hours_end}.{item.minutes_end}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </>
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
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0,
        shadowRadius: 2,
        elevation: 3
    },
    leftContent: {
        flex: 1,
        marginLeft: 5
    },
    rightContent: {
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayStyle: {
        color: '#FF8E15',
        fontWeight: 'bold'
    },
    activityStyle: {
        color: '#086788',
        fontWeight: 'bold',
        fontSize: 16
    },
    timeStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default CyclingHistoryScreen