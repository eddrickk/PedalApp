import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Context as FriendContext } from '../../context/FriendContext'
import Header from '../../components/Header'
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

const SearchFriendScreen = ({navigation}) => {
    const {data, deleteFriend} = useContext(FriendContext)
    const[name, setName] = useState('')
    const[results, setResult] = useState([])

    const filterDataByName = (nameChosen) => {
        return data.filter(data => {
            return data.name === nameChosen
        })
    }

    useEffect(()=>{
        setResult(data)
    }, [])

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
                <TextInput 
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder='Search'
                    value={name}
                    onChangeText={(newName) => {setName(newName)}}
                    onEndEditing={() => {setResult(filterDataByName(name))}}
                />
            </View>
            
            <FlatList 
                data={results}
                keyExtractor={friend => friend.id}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('FriendProfile', {id: item.id})}>
                            <View style={styles.friendList}>
                                <Image style={styles.profilePic} source={{uri: item.image}} />
                                <Text style={{flex: 3, alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
                                
                                <TouchableOpacity style={{alignSelf: 'center', flex: 1}} onPress={() => deleteFriend(item.id)}>
                                    <FontAwesome name="remove" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
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
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    inputStyle: {
        marginHorizontal:10,
        borderWidth:3,
        borderColor:'#F3EFE4',
        borderRadius:15,
        margin:10,
        backgroundColor:'white',
        paddingLeft :10
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
        marginVertical: 20,
        marginHorizontal: 30
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

export default SearchFriendScreen