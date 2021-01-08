import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-navigation'

const SearchFriendScreen = ({navigation}) => {
    return <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
        <Text>Search Screen</Text>
        <Button title="to sign in" onPress={() => {navigation.navigate('Signin')}} />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    
        icon: {
          height: 20,
          width: 20,
        },
})

export default SearchFriendScreen