import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Context as FriendContext } from '../../context/FriendContext'
import { Context as CyclingContext } from '../../context/CyclingwithFriendContext'
import Header from '../../components/Header'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

const InviteFriendScreen = ({navigation}) => {
    const room_id = navigation.getParam('room_id')
    const {data} = useContext(FriendContext)
    const {addPlayer} = useContext(CyclingContext)
    const[name, setName] = useState('')
    const[results, setResult] = useState([])

    const filterDataByName = (nameChosen) => {
        return data.filter(data => {
            return data.name.toLowerCase().includes(nameChosen.toLowerCase())
        })
    }

    useEffect(()=>{
        setResult(data)
    }, [])

    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#FBF199'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('CyclingWithFriends')}}>
                        <Ionicons name="chevron-back" size={24} color="#F3EFE4" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Add Friends</Text>
                    <Image style={styles.icon} source={require('../../../assets/icon.png')} />
                </View>
                
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{
                        flex: 1,
                    }} onPress={() => {navigation.navigate('SearchFriend')}}>
                        <Text style={styles.buttonSearch}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 1,
                    }} onPress={() => {navigation.navigate('cyclingWithFriendsFlow')}}>
                        <Text style={styles.buttonCycling}>Cycling with Friends</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{backgroundColor: '#FBF199'}}>
                <View style={styles.inputStyle}>
                    <TextInput 
                        style={{flex: 1}}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder='Search by Name'
                        value={name}
                        onChangeText={(newName) => {setName(newName), setResult(filterDataByName(newName))}}
                        onEndEditing={() => {setResult(filterDataByName(name))}}
                    />
                    <TouchableOpacity onPress={() => {setResult(filterDataByName(name))}}>
                        <Image style={styles.searchIcon} source={require('../../../assets/Search.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <FlatList 
                    data={results}
                    keyExtractor={friend => friend.id}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('FriendProfile', {id: item.id})}>
                                <View style={styles.friendList}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Image style={styles.profilePic} source={{uri: item.image}} />
                                        <Text style={{flex: 3, alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
                                    </View>
                                    <TouchableOpacity style={{alignSelf: 'center', marginHorizontal: 20}} onPress={() => addPlayer(room_id, item.id, item.image, item.name, 0, 0, 0, () => {navigation.navigate('CyclingWithFriends')})}>
                                        <Image style={styles.profilePic} source={require('../../../assets/Add_User.png')} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </ScrollView>
            
            <TouchableOpacity onPress={() => navigation.navigate('FriendAdd')}>
                <Text style={styles.buttonAdd}>Add</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    friendList: {
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        flexDirection: 'row',
        marginHorizontal: 20
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
    searchIcon: {
        height: 50,
        width: 50,
    },
    icon: {
        height: 20,
        width: 20,
        marginRight: 10
    },
    inputStyle: {
        marginHorizontal:10,
        borderWidth:3,
        borderColor:'#F3EFE4',
        borderRadius:15,
        margin:10,
        backgroundColor:'white',
        paddingLeft :10,
        flexDirection: 'row',
        alignItems: 'center',
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
    buttonCycling: {
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
    profilePic: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 20
    },
    buttonAdd: {
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

export default InviteFriendScreen