import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, Image, TextInputComponent } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { LinearGradient } from 'expo-linear-gradient'

const SigninScreen = ({navigation}) => {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <LinearGradient colors={['#FF8E15', 'transparent']} style={{flex: 1}}>
                <Image style={styles.icon} source={require('../../assets/icon.png')} />
                <Text style={styles.title}>Login</Text>
                <TextInput 
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder='Username'
                    value={username}
                    onChangeText={(newUser) => {setUsername(newUser)}}
                />
                <TextInput 
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder='Password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(newPass) => {setPassword(newPass)}}
                />
                <TouchableOpacity onPress={() => {navigation.navigate('homeFlow')}}>
                    <Text style={styles.buttonSignin}>SIGN IN</Text>
                </TouchableOpacity>
                
                <Text style={{
                    color: '#086788',
                    alignSelf: 'center'
                }}>Don't have an account ? Get Yours!</Text>

                <TouchableOpacity onPress={() => {navigation.navigate('Signup')}}>
                    <Text style={styles.buttonSignup}>REGISTER</Text>
                </TouchableOpacity>
                
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginTop: 40
    },
    title: {
        color: '#086788',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        paddingVertical: 40
    },
    inputStyle: {
        alignSelf: 'center',
        color: '#C4C4C4',
        fontWeight: 'bold',
        backgroundColor: 'white',
        textAlignVertical: 'center',
        height: 50,
        width: 250,
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: -2
          },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5
    },
    buttonSignin: {
        color: '#FDF9B7',
        backgroundColor: '#084B83',
        fontWeight: 'bold',
        fontSize: 16,
        height: 40,
        width: 150,
        borderRadius: 12,
        alignSelf: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: -2
          },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5
    },
    buttonSignup: {
        color: '#084B83',
        backgroundColor: '#FDF9B7',
        fontWeight: 'bold',
        fontSize: 16,
        height: 40,
        width: 150,
        borderColor: '#084B83',
        borderWidth: 1,
        borderRadius: 12,
        alignSelf: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: -2
          },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5
    }
})

export default SigninScreen