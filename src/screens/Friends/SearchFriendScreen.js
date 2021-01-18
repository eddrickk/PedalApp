import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Context as FriendContext } from '../../context/FriendContext'
import AccountContext from '../../context/AccountContext'
import Header from '../../components/Header'
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

const SearchFriendScreen = ({navigation}) => {
    const {data, deleteFriend} = useContext(FriendContext)
    const {account, addAccount} = useContext(AccountContext)
    const[name, setName] = useState('')
    const[results, setResult] = useState([])

    const alertButton = ({id}) => {
        Alert.alert(
            'Confirmation',
            'Remove from Friends?',
            [
            {text: 'Yes', onPress: () => deleteFriend(id), style: 'default'},
            {text: 'No', onPress: () => null, style: 'cancel'}
            ]
        );
    }

    const filterDataByName = (nameChosen) => {
        return data.filter(data => {
            return data.name.toLowerCase().includes(nameChosen.toLowerCase())
        })
    }

    useEffect(()=>{
        setResult(data)
    }, [data])

    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#FBF199'}}>
                <Header title='Friends' />
                
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
                        <Image style={styles.icon} source={require('../../../assets/Search.png')} />
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
                                    <TouchableOpacity style={{alignSelf: 'center', marginHorizontal: 20}} onPress={() => alertButton({id: item.id})}>
                                        <FontAwesome name="remove" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </ScrollView>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <TouchableOpacity onPress={() => navigation.navigate('FriendAdd')}>
                    <Text style={styles.buttonAdd}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('FriendNearby')}>
                    <Text style={styles.buttonAdd}>Nearby</Text>
                </TouchableOpacity>
            </View>
            
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
        width: 100,
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

export default SearchFriendScreen