import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Header from '../../components/Header'
import AccountContext from '../../context/AccountContext'
import { Context as UserContext } from '../../context/UserContext'
import CommunityContext from '../../context/CommunityContext'
import CommunityMemberContext from '../../context/CommunityMemberContext'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import {Dimensions} from 'react-native'
const win = Dimensions.get('window');

const CommunityJoinScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const {data, editUser} = useContext(UserContext)
    const {account} = useContext(AccountContext)
    const [accountData, setAccountData] = useState(account[account.length-1])
    const {community, comFunc} = useContext(CommunityContext)
    const {member, memFunc} = useContext(CommunityMemberContext)
    const [results, setResult] = useState([])
    // console.log(community)
    // console.log(member)

    
    const filterCommunityByName = (nameChosen) => {
        return community.filter(data => {
            return data.name.toLowerCase().includes(nameChosen.toLowerCase())
        })
    }
    const filterDataByUsername = (usernameChosen) => {
        return data.filter(data => {
            return data.username.toLowerCase() === usernameChosen.toLowerCase()
        })
    }
    const checkCommunity = (idChosen) => {
        for (let com of member){
            if (com.community_id === idChosen && com.user_id === filterDataByUsername(accountData.username)[0].id){
                return false
            }
        }
        return true
    }
    const alertButtonConfirm = (id, image, name) => {
        Alert.alert(
            'Confirmation',
            'Join Community ?',
            [
            {text: 'Yes', onPress: () => initJoinCommunity(id, image, name)},
            {text: 'No', onPress: () => navigation.navigate('CommunityJoin'), style: 'cancel'}
            ]
        );
    }
    const alertButton = () => {
        Alert.alert(
            'Information',
            'Joined Community',
            [
            {text: 'OK', onPress: () => navigation.navigate('Community')},
            ]
        );
    }
    const cantjoinButton = () => {
        Alert.alert(
            'Information',
            'You have joined this community',
            [
            {text: 'OK', onPress: () => navigation.navigate('CommunityJoin')},
            ]
        );
    }
    const initJoinCommunity = (id, image, name) => {
        memFunc.addMember(id, image, name, filterDataByUsername(accountData.username)[0].image, filterDataByUsername(accountData.username)[0].name, filterDataByUsername(accountData.username)[0].id, 'member')
        alertButton()
    }
    const checkBeforeJoin = (id, image, name) => {
        if (checkCommunity(id)){
            alertButtonConfirm(id, image, name)
        }
        else{
            cantjoinButton()
        }
    }

    useEffect(()=>{
        setResult(community)
    }, [community])
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#FBF199'}}>
                <Header title='Join Community' />
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{
                        flex: 1,
                    }} onPress={() => {navigation.navigate('Community')}}>
                        <Text style={styles.buttonCommunity}>My Community</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 1,
                    }} onPress={() => {navigation.navigate('JoinCommunity')}}>
                        <Text style={styles.buttonJoinCommunity}>Join Community</Text>
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
                    onChangeText={(newName) => {setName(newName), setResult(filterCommunityByName(name))}}
                    onEndEditing={() => {setResult(filterCommunityByName(name))}}
                />
                <TouchableOpacity onPress={() => {setResult(filterCommunityByName(name))}}>
                    <Image style={styles.iconSearch} source={require('../../../assets/Search.png')} />
                </TouchableOpacity>
            </View>
            </View>
            
            <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            >
                <FlatList 
                    data={results}
                    keyExtractor={friend => friend.id}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('CommunityDetail', {id: item.id})}>
                                <View style={styles.communityList}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        {/* <Image style={styles.communityPic} source={{uri: filterCommunityByID(item.community_id)[0].image}} />
                                        <Text style={{flex: 3, alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>{filterCommunityByID(item.community_id)[0].name}</Text> */}
                                        <Image style={styles.communityPic} source={{uri: item.image}} />
                                        <Text style={{flex: 3, alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
                                        <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => checkBeforeJoin(item.id, item.image, item.name)}>
                                            <Text style={styles.button}>Join</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                
            </ScrollView>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputStyle:{
        marginHorizontal:10,
        borderWidth:3,
        borderColor:'#F3EFE4',
        borderRadius:15,
        margin:10,
        backgroundColor:'white',
        paddingLeft :10
    },
    container: {
        flex: 1,
    },
    
    scrollView: {
        backgroundColor:'#F3EFE4',
        height: win.height
    },
    iconSearch: {
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
    buttonJoinCommunity: {
        color: '#086788',
        backgroundColor: '#FFD8AD',
        fontWeight: 'bold',
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
    buttonCommunity: {
        color: '#F3EFE4',
        backgroundColor: '#FF8E15',
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
    communityList: {
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        flexDirection: 'row',
        marginHorizontal: 20
    },
    communityPic: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 20
    },
    button: {
        color: '#FDF9B7',
        backgroundColor: '#FF8E15',
        fontWeight: 'bold',
        fontSize: 16,
        height: 30,
        width: 80,
        borderRadius: 12,
        alignSelf: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginVertical: 10,
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

export default CommunityJoinScreen