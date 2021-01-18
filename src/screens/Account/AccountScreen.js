import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Dimensions, Alert } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Header from '../../components/Header'
import { Context as UserContext } from '../../context/UserContext'
import AccountContext from  '../../context/AccountContext'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
const win = Dimensions.get('window');

const AccountScreen = ({navigation}) => {
    const {data} = useContext(UserContext)
    const {account, func} = useContext(AccountContext)
    const [accountData, setAccountData] = useState(account[account.length-1])

    const filterDataByUsername = (usernameChosen) => {
        return data.filter(data => {
            return data.username.toLowerCase() === usernameChosen.toLowerCase()
        })
    }

    const alertButton = () => {
        Alert.alert(
            'Log Out',
            `Log Out ${accountData.username} ?`,
            [
            {text: 'Yes', onPress: () => navigation.navigate('Signin'), style: 'default'},
            {text: 'No', onPress: () => null, style: 'cancel'}
            ]
        );
    }

    useEffect(()=>{
        setAccountData(account[account.length-1])
    }, [account]) 

    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#F3EFE4'}}>
                <Header title='Account' />

                <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                >
                    <FlatList 
                    data={filterDataByUsername(accountData.username)}
                    keyExtractor={friend => friend.id}
                    renderItem={({item}) => {
                        return (
                            <>
                                <View style={styles.profileTitle}>
                                    <Image style={styles.profilePic} source={{uri: item.image}} />
                                    <View>
                                        <Text style={styles.profileName}>{item.name}</Text>
                                        <Text style={{fontWeight: 'bold'}}>{item.friends_number} Friends</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flex: 1}}>
                                        <Text style={styles.title}>Profile</Text>
                                        <View style={styles.content}>
                                            <View style={styles.contentLeft}>
                                                <Text style={styles.contentHeaderStyle}>Username</Text>
                                                <Text style={styles.contentHeaderStyle}>Email</Text>
                                                <Text style={styles.contentHeaderStyle}>Phone Number</Text>
                                            </View>
                                            <View style={styles.contentRight}>
                                                <Text style={styles.contentStyle}>{item.username}</Text>
                                                <Text style={styles.contentStyle}>{item.email}</Text>
                                                <Text style={styles.contentStyle}>{item.phone}</Text>
                                            </View>
                                        </View>

                                        <Text style={styles.title}>Statistics</Text>
                                        <View style={styles.content}>
                                            <View style={styles.contentLeft}>
                                                <Text style={styles.contentHeaderStyle}>Time Spent</Text>
                                                <Text style={styles.contentHeaderStyle}>Distance Travelled</Text>
                                                <Text style={styles.contentHeaderStyle}>Average Speed</Text>
                                            </View>
                                            <View style={styles.contentRight}>
                                                <Text style={styles.contentStyle}>{Math.floor(item.time_spent/3600)} H {Math.floor((item.time_spent%3600)/60)} M {Math.floor((item.time_spent%3600)%60)} s</Text>
                                                <Text style={styles.contentStyle}>{item.distance_travelled} M</Text>
                                                <Text style={styles.contentStyle}>{Math.floor(item.distance_travelled/item.time_spent)} m/s</Text>
                                            </View>
                                        </View>

                                        <Text style={styles.title}>Cycling Battle</Text>
                                        <View style={styles.content}>
                                            <View style={styles.contentLeft}>
                                                <Text style={styles.contentHeaderStyle}>Wins</Text>
                                                <Text style={styles.contentHeaderStyle}>Draws</Text>
                                                <Text style={styles.contentHeaderStyle}>Loses</Text>
                                            </View>
                                            <View style={styles.contentRight}>
                                                <Text style={styles.contentStyle}>{item.battle_wins}</Text>
                                                <Text style={styles.contentStyle}>{item.battle_draws}</Text>
                                                <Text style={styles.contentStyle}>{item.battle_loses}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => navigation.navigate('EditAccount')}>
                                        <Image style={styles.editButton} source={require('../../../assets/Edit.png')} />
                                    </TouchableOpacity>
                                </View>
                            </>
                        )
                        }}
                    />

                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('CyclingHistory')}>
                            <Text style={styles.button}>History</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alertButton()}>
                            <Text style={styles.button}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3EFE4'
    },
    scrollView: {
        height: win.height
    },
    profileTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#FF8E15',
        borderBottomWidth: 1,
        marginHorizontal: 10
    },
    profileName: {
        fontSize: 24
    },
    profilePic: {
        width: 70,
        height: 70,
        marginVertical: 10,
        marginRight: 20,
        marginLeft: 10
    },
    title: {
        color: '#086788',
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 24
    },
    content: {
        flexDirection: 'row',
        marginHorizontal: 10,
        width: win.width-50,
    },
    contentLeft: {
        flex: 1,
    },
    contentRight: {
        flex: 1
    },
    contentHeaderStyle: {
        fontSize: 16,
        color: '#086788',
    },
    contentStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    button: {
        color: '#F3EFE4',
        backgroundColor: '#FF8E15',
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
    editButton: {
        width: 30,
        height: 30,
        marginRight: 10,
        marginVertical: 10
    },
})

export default AccountScreen