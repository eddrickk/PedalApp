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

const CommunityShowScreen = ({navigation}) => {
    const community_id = navigation.getParam('id')
    const [name, setName] = useState('')
    const {data, editUser} = useContext(UserContext)
    const {account} = useContext(AccountContext)
    const [accountData, setAccountData] = useState(account[account.length-1])
    const {community, comFunc} = useContext(CommunityContext)
    const {member, memFunc} = useContext(CommunityMemberContext)
    const {posts, postFunc} = useContext(PostContext)
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
    console.log(posts)
    
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
    const filterPostByID = () => {
        return posts.filter(data => {
            return data.community_id === community_id
        })
    }
    const filterMemberByID = () => {
        return member.filter(data => {
            return data.community_id === community_id && data.user_id === filterDataByUsername(accountData.username)[0].id
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
    }, [posts])
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#FBF199'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Community')}}>
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
                <ImageBackground
                    source={require('../../../assets/Community_Bg.png')}
                    imageStyle={{height: 200}}
                    style={styles.cyclingBackground}>
                        <View style={{flexDirection: 'row', alignItems: 'center', width: win.width}}>
                            <View style={{flex: 1}}>
                                <Text style={{paddingTop: 30, paddingLeft: 10, flex: 1, textAlignVertical: 'bottom', color: '#086788', fontSize: 18}}>{results[0].name}</Text>
                            </View>
                            
                            <View style={{backgroundColor: '#C4C4C4', borderRadius: 360, width: 80, height: 80, justifyContent: 'center', alignItems: 'center'}}>
                                <Image style={{height: 70, width: 70}} source={{uri: results[0].image}} />
                            </View>
                            <View style={{flex: 1, alignItems: 'flex-end', marginTop: 40, marginRight: 10}}>
                                <Image style={{height: 30, width: 30}} source={require('../../../assets/Chat.png')} />
                            </View>
                        </View>
                </ImageBackground>
                <View style={{marginHorizontal: 50, borderColor: '#086788', borderWidth: 1}}></View>
                {/* <View style={{marginHorizontal: 10}}>
                    <Text style={{fontSize: 18}}>Stories</Text>
                </View> */}
                
                <View style={{marginHorizontal: 10}}>
                    <Text style={{fontSize: 18}}>Posts</Text>
                    <FlatList 
                        data={filterPostByID()}
                        keyExtractor={friend => friend.id}
                        renderItem={({item}) => {
                            return (
                                <View style={styles.postsList}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Image style={styles.memberPic} source={{uri: item.image}} />
                                        <View style={{marginVertical: 10}}>
                                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
                                            <Text style={{fontSize: 12, textTransform: 'capitalize'}}>{item.position}</Text>
                                        </View>                                     
                                    </View>
                                    <View style={{marginHorizontal: 10}}>
                                        <Text>{item.content}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', marginHorizontal: 10, marginVertical: 10}}>
                                        <Image style={{width: 20, height: 20, marginRight: 10}} source={require('../../../assets/Like_Blue.png')} />
                                        <Image style={{width: 20, height: 20}} source={require('../../../assets/Comment.png')} />
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
                
            </ScrollView>
            <FloatingAction 
                color='#FF8E15'
                actions={actions}
                onPressItem={() => navigation.navigate('PostNew', {community_id: community_id, user_id: filterDataByUsername(accountData.username)[0].id, 
                    image: filterDataByUsername(accountData.username)[0].image, name: filterDataByUsername(accountData.username)[0].name, position: filterMemberByID()[0].position})}
            />
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

    postsList: {
        borderColor: '#C4C4C4',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        marginVertical: 10
    },
    memberPic: {
        width: 50,
        height: 50,
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

export default CommunityShowScreen