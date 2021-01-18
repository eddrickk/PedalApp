import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Dimensions, Alert } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Header from '../../components/Header'
import { Context as UserContext } from '../../context/UserContext'
import AccountContext from  '../../context/AccountContext'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
const win = Dimensions.get('window');

const EditAccountScreen = ({navigation}) => {
    const {data, editUser} = useContext(UserContext)
    const {account, func} = useContext(AccountContext)
    const [accountData, setAccountData] = useState(account[account.length-1])
    const[name, setName] = useState('')
    const[username, setUsername] = useState('')
    const[email, setEmail] = useState('')
    const[phone, setPhone] = useState('')

    const filterDataByUsername = (usernameChosen) => {
        return data.filter(data => {
            return data.username.toLowerCase() === usernameChosen.toLowerCase()
        })
    }

    const alertButton = (id, image, name, username, email, password, phone, time_spent, distance_travelled, average_speed, battle_wins, 
        battle_draws, battle_loses, friends_number) => {
        Alert.alert(
            'Confirmation',
            'Save Changes ?',
            [
            {text: 'Yes', onPress: () => {
                func.addAccount(username)
                editUser(id, image, name, username, email, password, phone, time_spent, distance_travelled, average_speed, battle_wins, 
                battle_draws, battle_loses, friends_number, () => navigation.navigate('Account'))}, style: 'default'},
            {text: 'No', onPress: () => null, style: 'cancel'}
            ]
        );
    }

     useEffect(()=>{
        setName((filterDataByUsername(accountData.username))[0].name)
        setUsername((filterDataByUsername(accountData.username))[0].username)
        setEmail((filterDataByUsername(accountData.username))[0].email)
        setPhone((filterDataByUsername(accountData.username))[0].phone)
    }, []) 

    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#F3EFE4'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Account')}}>
                        <Ionicons name="chevron-back" size={24} color="#F3EFE4" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Edit Account</Text>
                    <Image style={styles.icon} source={require('../../../assets/icon.png')} />
                </View>

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
                                        <TextInput 
                                            style={styles.profileName}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            placeholder = {item.name}
                                            value={name}
                                            onChangeText={(newName) => {setName(newName)}}
                                        />
                                        <Text style={{fontWeight: 'bold'}}>{item.friends_number} Friends</Text>
                                    </View>
                                </View>
                                <Text style={styles.title}>Profile</Text>
                                <View style={styles.content}>
                                    <View style={styles.contentLeft}>
                                        <Text style={styles.contentHeaderEditedStyle}>Username</Text>
                                        <Text style={styles.contentHeaderEditedStyle}>Email</Text>
                                        <Text style={styles.contentHeaderEditedStyle}>Phone Number</Text>
                                    </View>
                                    <View style={styles.contentRight}>
                                        <TextInput 
                                            style={styles.contentStyle}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            placeholder={item.username}
                                            value={username}
                                            onChangeText={(newUser) => {setUsername(newUser)}}
                                        />
                                        <TextInput 
                                            style={styles.contentStyle}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            keyboardType='email-address'
                                            textContentType='emailAddress'
                                            placeholder={item.email}
                                            value={email}
                                            onChangeText={(newEmail) => {setEmail(newEmail)}}
                                        />
                                        <TextInput 
                                            style={styles.contentStyle}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            textContentType="telephoneNumber"
                                            keyboardType='phone-pad'
                                            placeholder={item.phone}
                                            value={phone}
                                            onChangeText={(newPhone) => {setPhone(newPhone)}}
                                        />
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

                                <TouchableOpacity onPress={() => alertButton(item.id, item.image, name, username, email, item.password, phone, item.time_spent, item.distance_travelled, 
                                    item.average_speed, item.battle_wins, item.battle_draws, item.battle_loses, item.friends_number)}>
                                    <Text style={styles.button}>Save Changes</Text>
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
        backgroundColor: '#F3EFE4'
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
    contentHeaderEditedStyle: {
        fontSize: 16,
        color: '#086788',
        marginBottom: 7
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
        width: 150,
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

export default EditAccountScreen