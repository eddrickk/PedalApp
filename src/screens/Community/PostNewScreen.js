import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Alert, ImageBackground } from 'react-native'
import { NavigationContext, SafeAreaView } from 'react-navigation'
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

const PostNewScreen = ({navigation}) => {
    const community_id = navigation.getParam('community_id')
    const user_id = navigation.getParam('user_id')
    const image = navigation.getParam('image')
    const name = navigation.getParam('name')
    const position = navigation.getParam('position')
    const [content, setContent] = useState('')
    const {data, editUser} = useContext(UserContext)
    const {account} = useContext(AccountContext)
    const [accountData, setAccountData] = useState(account[account.length-1])
    const {community, comFunc} = useContext(CommunityContext)
    const {member, memFunc} = useContext(CommunityMemberContext)
    const {posts, postFunc} = useContext(PostContext)

    const filterDataByUsername = (usernameChosen) => {
        return data.filter(data => {
            return data.username.toLowerCase() === usernameChosen.toLowerCase()
        })
    }

    const alertButtonConfirm = (community_id, post_id, user_id, image, name, position, content, like, comment_id) => {
        Alert.alert(
            'Confirmation',
            'Submit Post ?',
            [
            {text: 'Yes', onPress: () => initNewPost(community_id, post_id, user_id, image, name, position, content, like, comment_id)},
            {text: 'No', onPress: () => navigation.navigate('PostNew'), style: 'cancel'}
            ]
        );
    }
    const alertButton = () => {
        Alert.alert(
            'Information',
            'Post Added',
            [
            {text: 'OK', onPress: () => navigation.navigate('CommunityShow')},
            ]
        );
    }
    const initNewPost = (community_id, post_id, user_id, image, name, position, content, like, comment_id) => {
        postFunc.addPost(community_id, post_id, user_id, image, name, position, content, like, comment_id)
        alertButton()
    }

    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#FBF199'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('CommunityShow')}}>
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
                <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 16, color: '#086788', marginTop: 10}}>New Post</Text>
                <View style={styles.postCreate}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image style={styles.memberPic} source={{uri: image}} />
                        <View style={{marginVertical: 10}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{name}</Text>
                            <Text style={{fontSize: 12, textTransform: 'capitalize'}}>{position}</Text>
                        </View>                                     
                    </View>
                    <View style={{marginHorizontal: 10, marginBottom: 10}}>
                        <TextInput 
                            style={styles.inputStyle}
                            autoCapitalize="none"
                            autoCorrect={false}
                            multiline={true}
                            placeholder='Content Here'
                            value={content}
                            onChangeText={(newContent) => {setContent(newContent)}}
                        />
                    </View>
                </View>
                
            </ScrollView>
            <FloatingAction 
                    color='#FF8E15'
                    onPressMain={() => alertButtonConfirm(community_id, posts.length+1, user_id, image, name, position, content, 0, posts.length+1)}
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputStyle:{
        
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
        height: win.height
    },

    postCreate: {
        borderColor: '#C4C4C4',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        margin: 10
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

export default PostNewScreen