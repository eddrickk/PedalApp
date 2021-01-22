import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Picker } from '@react-native-picker/picker'
import Header from '../../components/Header'
import AccountContext from '../../context/AccountContext'
import { Context as UserContext } from '../../context/UserContext'
import CommunityContext from '../../context/CommunityContext'
import CommunityMemberContext from '../../context/CommunityMemberContext'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import {Dimensions} from 'react-native'

const CommunityCreateScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [memberTotal, setMemberTotal] = useState(0)
    const [selectedValue, setSelectedValue] = useState("open");
    const {data, editUser} = useContext(UserContext)
    const {account} = useContext(AccountContext)
    const [accountData, setAccountData] = useState(account[account.length-1])
    const {community, comFunc} = useContext(CommunityContext)
    const {member, memFunc} = useContext(CommunityMemberContext)
    const win = Dimensions.get('window');
    const ratio = win.height

    const filterDataByUsername = (usernameChosen) => {
        return data.filter(data => {
            return data.username.toLowerCase() === usernameChosen.toLowerCase()
        })
    }
    const alertButtonConfirm = () => {
        Alert.alert(
            'Confirmation',
            'Create Community ?',
            [
            {text: 'Yes', onPress: () => initCreateCommunity()},
            {text: 'No', onPress: () => navigation.navigate('CommunityCreate'), style: 'cancel'}
            ]
        );
    }
    const alertButton = () => {
        Alert.alert(
            'Information',
            'Community Created',
            [
            {text: 'OK', onPress: () => navigation.navigate('Community')},
            ]
        );
    }
    const initCreateCommunity = () => {
        comFunc.addCommunity(community.length+1, 'https://www.iconsdb.com/icons/preview/color/FF8E15/conference-xxl.png', name, desc, memberTotal, selectedValue, community.length+1, community.length+1, community.length+1),
        memFunc.addMember(community.length+1, 'https://www.iconsdb.com/icons/preview/color/FF8E15/conference-xxl.png', name, filterDataByUsername(accountData.username)[0].id, 'leader')
        alertButton()
    }
    const maxMember = () => {
        return memberTotal > 25 
        ? setMemberTotal(25) 
        : null
    }
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#FBF199'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Community')}}>
                        <Ionicons name="chevron-back" size={24} color="#F3EFE4" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Create Community</Text>
                    <Image style={styles.icon} source={require('../../../assets/icon.png')} />
                </View>
            </View>
            <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            >
                <View style={styles.communityTitle}>
                    <Image style={styles.communityPic} source={{uri: 'https://www.iconsdb.com/icons/preview/color/FF8E15/conference-xxl.png'}} />
                    <View style={{flex: 1}}>
                        <Text>Community Name</Text>
                        <View style={styles.inputNameStyle}>
                            <TextInput 
                                style={{flex: 1}}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder='Community Name'
                                value={name}
                                onChangeText={(newName) => {setName(newName)}}
                                //onEndEditing={() => {setResult(filterDataByName(name))}}
                            />
                        </View>
                    </View>
                </View>
                <View style={{marginHorizontal: 10}}>
                    <Text>Description</Text>
                    <View style={styles.inputDescStyle}>
                        <TextInput 
                            style={{flex: 1, alignSelf: 'baseline'}}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder='Community Description'
                            value={desc}
                            onChangeText={(newDesc) => {setDesc(newDesc)}}
                            //onEndEditing={() => {setResult(filterDataByName(name))}}
                        />
                    </View>
                    <Text>Members : {memberTotal || 0}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                        <View style={styles.inputMemberStyle}>
                            <TextInput 
                                style={{flex: 1}}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder='0'
                                value={memberTotal}
                                onChangeText={(newTotal) => {setMemberTotal(parseInt(newTotal))}}
                                onEndEditing={() => {maxMember()}}
                            />
                        </View>
                        <Text>(Max 25)</Text>
                    </View>
                    <Text>Status</Text>
                    <View style={{backgroundColor: 'white', width: 150, borderRadius: 10}}>
                    <Picker
                        selectedValue={selectedValue}
                        style={{height: 40, width: 150}}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedValue(itemValue)
                        }>
                        <Picker.Item label="Open" value="open" />
                        
                    </Picker>
                    </View>
                    
                </View>
                
                <TouchableOpacity onPress={() => alertButtonConfirm()}>
                    <Text style={styles.button}>Create Community</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Community')}>
                    <Text style={styles.button}>Cancel</Text>
                </TouchableOpacity>
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
    scrollView: {
        backgroundColor:'#F3EFE4'
    },
    buttonCommunity: {
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
    buttonJoinCommunity: {
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
    button: {
        color: '#FDF9B7',
        backgroundColor: '#084B83',
        fontWeight: 'bold',
        fontSize: 16,
        height: 45,
        width: 150,
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
    communityTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10
    },
    communityName: {
        fontSize: 16
    },
    communityPic: {
        width: 70,
        height: 70,
        marginVertical: 10,
        marginRight: 20,
        marginLeft: 10
    },
    inputNameStyle: {
        borderWidth:3,
        borderColor:'#F3EFE4',
        borderRadius:10,
        backgroundColor:'white',
        paddingLeft :10,
        flexDirection: 'row',
    },
    inputDescStyle: {
        borderWidth:3,
        borderColor:'#F3EFE4',
        borderRadius:10,
        backgroundColor:'white',
        paddingLeft :10,
        flexDirection: 'row',
        height: 120,
        marginBottom: 10,
    },
    inputMemberStyle: {
        borderWidth:3,
        borderColor:'#F3EFE4',
        borderRadius:10,
        backgroundColor:'white',
        paddingLeft :10,
        flexDirection: 'row',
        width: 50,
    },
})

export default CommunityCreateScreen