import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Context as UserContext } from '../../context/UserContext'
import { Ionicons } from '@expo/vector-icons'
const win = Dimensions.get('window');

const FriendProfileScreen = ({navigation}) => {
    const id = navigation.getParam('id')
    const {data} = useContext(UserContext)
    const[results, setResult] = useState(null)

    const filterDataByID = (idChosen) => {
        return data.filter(data => {
            return data.id === idChosen
        })
    }
    useEffect(()=>{
        setResult(filterDataByID(id))
    }, [])

    if(!results){
        return null
    }
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>{navigation.navigate('SearchFriend')}}>
                    <Ionicons name="chevron-back" size={24} color="#F3EFE4" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Friends</Text>
                <Image style={styles.icon} source={require('../../../assets/icon.png')} />
            </View>
            <ScrollView>
                <FlatList 
                    data={results}
                    keyExtractor={(item) => {item.id}}
                    renderItem = {({item}) => {
                        return (
                            <>
                                <View style={styles.profileTitle}>
                                    <Image style={styles.profilePic} source={{uri: item.image}} />
                                    <View>
                                        <Text style={styles.profileName}>{item.name}</Text>
                                        <Text style={{fontWeight: 'bold'}}>{item.friends_number} Friends</Text>
                                    </View>
                                </View>
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
                            </>
                        )
                    }}
                />
            </ScrollView>
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
        width: win.width-10,
    },
    contentLeft: {
        flex: 1
    },
    contentRight: {
        flex: 1
    },
    contentHeaderStyle: {
        fontSize: 16,
        color: '#086788'
    },
    contentStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default FriendProfileScreen