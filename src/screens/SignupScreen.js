import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList } from 'react-native'

const SignupScreen = ({navigation}) => {
    return <View>
        <Text>Sign Up Screen</Text>
        <Button title="to sign in" onPress={() => {navigation.navigate('Signin')}} />
    </View>
}

const styles = StyleSheet.create({

})

export default SignupScreen