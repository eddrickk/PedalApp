import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Dimensions, Alert } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Context as UserContext } from '../../context/UserContext'
import { Context as FriendContext } from '../../context/FriendContext'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
const win = Dimensions.get('window');

const FriendAddScreen = ({navigation}) => {
    /* const [dataUser, setDataUser] = useState(null)
    const [dataFriend, setDataFriend] = useState(null)

    const getUserData = () => {
        const {data} = useContext(UserContext)
        setDataUser(data)
    }

    const getFriendData = () => {
        const {data} = useContext(FriendContext)
        setDataFriend(data)
    } */
    
    const {data} = useContext(UserContext)
    const {addFriend} = useContext(FriendContext)
    const[name, setName] = useState('')
    const[results, setResult] = useState(null)

    const alertButton = () => {
        Alert.alert(
            'Information',
            'Friend Added',
            [
            {text: 'OK', onPress: () => navigation.navigate('FriendAdd')},
            ]
        );
    }
    
    const filterDataByName = (nameChosen) => {
        return data.filter(data => {
            return data.name.toLowerCase().includes(nameChosen.toLowerCase())
        })
    }

    
    /* useEffect(()=>{
        getUserData(),
        getFriendData(),
        setResult(filterDataByID(id))
    }, []) */
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>{navigation.navigate('SearchFriend')}}>
                    <Ionicons name="chevron-back" size={24} color="#F3EFE4" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Add Friends</Text>
                <Image style={styles.icon} source={require('../../../assets/icon.png')} />
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
                    keyExtractor={user => user.id}
                    renderItem={({item}) => {
                        return (
                            //<TouchableOpacity onPress={() => navigation.navigate('FriendProfile', {id: item.id})}>
                                <View style={styles.userList}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Image style={styles.profilePic} source={{uri: item.image}} />
                                        <Text style={{flex: 3, alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => {addFriend(item.id, item.image, item.name), alertButton()}}>
                                        <Image style={styles.profilePic} source={require('../../../assets/Add_User.png')} />
                                    </TouchableOpacity>
                                </View>
                                
                            //</TouchableOpacity>
                        )
                    }}
                />
                {/* {addUser === true 
                ? <View style={styles.card}>
                    <Text>Friend Added</Text>
                    {setAddUser(false)}
                </View> 
                : null} */}
            </ScrollView>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userList: {
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        flexDirection: 'row',
        marginHorizontal: 20
    },
    searchIcon: {
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
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 20
    },
    title: {
        color: '#086788',
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 24
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

export default FriendAddScreen