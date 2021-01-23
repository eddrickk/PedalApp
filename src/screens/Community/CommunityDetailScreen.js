import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Alert, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { FloatingAction } from 'react-native-floating-action'
import Header from '../../components/Header'
import AccountContext from '../../context/AccountContext'
import { Context as UserContext } from '../../context/UserContext'
import CommunityContext from '../../context/CommunityContext'
import CommunityMemberContext from '../../context/CommunityMemberContext'
import PostContext, { PostProvider } from '../../context/PostContext'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import {Dimensions} from 'react-native'
const win = Dimensions.get('window');

const CommunityDetailScreen = ({navigation}) => {
    const community_id = navigation.getParam('id')
    const [name, setName] = useState('')
    const {data, editUser} = useContext(UserContext)
    const {account} = useContext(AccountContext)
    const [accountData, setAccountData] = useState(account[account.length-1])
    const {community, comFunc} = useContext(CommunityContext)
    const {member, memFunc} = useContext(CommunityMemberContext)
    const [results, setResult] = useState(community)
    const actions = [
        {
          text: "New Post",
          icon: require('../../../assets/Add_Grey.png'),
          name: "bt_new",
          color: "#FF8E15",
          position: 1
        },
      ];
    // console.log(community)
    // console.log(member)
    console.log(results)
    
    const filterCommunityByID = (idChosen) => {
        return community.filter(data => {
            return data.id === idChosen
        })
    }
    const filterDataByUsername = (usernameChosen) => {
        return data.filter(data => {
            return data.username.toLowerCase() === usernameChosen.toLowerCase()
        })
    }

    const filterMemberByID = () => {
        return member.filter(data => {
            return data.community_id === community_id
        })
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
    const initJoinCommunity = (id, image, name) => {
        memFunc.addMember(id, image, name, filterDataByUsername(accountData.username)[0].id, 'member')
        alertButton()
    }

    useEffect(()=>{
        setResult(filterCommunityByID(community_id))
    }, [community])
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#FBF199'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('CommunityJoin')}}>
                        <Ionicons name="chevron-back" size={24} color="#F3EFE4" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Community</Text>
                    <Image style={styles.icon} source={require('../../../assets/icon.png')} />
                </View>
            </View>
            
            <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            >
                <View style={{marginHorizontal: 10}}>
                    <FlatList 
                        data={results}
                        keyExtractor={friend => friend.id}
                        renderItem={({item}) => {
                            return (
                                <View style={{borderBottomColor: '#FF8E15', borderBottomWidth: 1}}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Image style={styles.communityPic} source={{uri: item.image}} />
                                        <View style={{marginVertical: 10}}>
                                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
                                            <Text style={{fontSize: 12, textTransform: 'capitalize'}}>{item.desc}</Text>
                                        </View>                                     
                                    </View>
                                </View>
                            )
                        }}
                    />
                    <Text style={{color: '#086788', fontWeight: 'bold', fontSize: 20}}>Members</Text>
                    <FlatList 
                        data={filterMemberByID()}
                        keyExtractor={friend => friend.id}
                        renderItem={({item}) => {
                            return (
                                <View>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Image style={styles.communityPic} source={{uri: item.image}} />
                                        <View style={{marginVertical: 10}}>
                                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
                                            <Text style={{fontSize: 12, textTransform: 'capitalize'}}>{item.position}</Text>
                                        </View>                                     
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
                
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
    cyclingBackground: {
        alignSelf: 'center',
        width: win.width,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 150
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
        backgroundColor:'#F3EFE4',
        flex: 1,
        height: win.height
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

    communityPic: {
        width: 70,
        height: 70,
        alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 10
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

export default CommunityDetailScreen