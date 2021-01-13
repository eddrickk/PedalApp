import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Context as UserContext } from '../../context/UserContext'
import { Ionicons } from '@expo/vector-icons'
const win = Dimensions.get('window');

const FriendAddScreen = ({navigation}) => {
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
                <Text style={styles.headerText}>Add Friends</Text>
                <Image style={styles.icon} source={require('../../../assets/icon.png')} />
            </View>
            <ScrollView>
                
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