import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList } from 'react-native'

const SigninScreen = ({navigation}) => {
    return <View>
        <Button title="to sign up" onPress={() => {navigation.navigate('Signup')}} />
        <Button title="to main" onPress={() => {navigation.navigate('Search')}} />
    </View>
}

const styles = StyleSheet.create({

})

export default SigninScreen