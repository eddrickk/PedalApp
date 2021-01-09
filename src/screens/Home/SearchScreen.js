import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const SearchScreen = ({navigation}) => {
    const[name, setName] = useState('')
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >

                <View style={styles.header}>
                    <Text style={styles.headerText}>Home</Text>
                    <Image style={styles.icon} source={require('../../../assets/icon.png')} />
                </View>
                
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{
                        flex: 1,
                    }} onPress={() => {navigation.navigate('Search')}}>
                        <Text style={styles.buttonSearch}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 1,
                    }} onPress={() => {navigation.navigate('freeCyclingFlow')}}>
                        <Text style={styles.buttonFreeCycling}>FreeCycling</Text>
                    </TouchableOpacity>
                </View>
                <TextInput 
                            style={styles.inputStyle}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder='Name'
                            value={name}
                            onChangeText={(newName) => {setName(newName)}}
                        />

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF8E15',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 20,
        color: '#F3EFE4'
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
    buttonFreeCycling: {
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
})

export default SearchScreen