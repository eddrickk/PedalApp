import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Header from '../../components/Header'

const CyclingWithFriendsScreen = ({navigation}) => {
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    buttonCycling: {
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
    buttonSearch: {
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
})

export default CyclingWithFriendsScreen