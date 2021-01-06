import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const SignupScreen = ({navigation}) => {
    const[name, setName] = useState('')
    const[username, setUsername] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPass] = useState('')
    const[conpassword, setConPass] = useState('')
    const[phone, setPhone] = useState('')
    
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <LinearGradient colors={['#FF8E15', 'transparent']} style={{flex: 1}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Signin')}}>
                        <Ionicons name="chevron-back" size={24} color="#F3EFE4" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Register</Text>
                    <Image style={styles.icon} source={require('../../assets/icon.png')} />
                </View>

                <View style={{marginTop: 40, alignSelf: 'center', width: 280}}>
                    <Text style={styles.title}>Name</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput 
                            style={styles.inputStyle}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder='Name'
                            value={name}
                            onChangeText={(newName) => {setName(newName)}}
                        />
                    </View>

                    <Text style={styles.title}>Username</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput 
                            style={styles.inputStyle}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder='Username'
                            value={username}
                            onChangeText={(newUser) => {setUsername(newUser)}}
                        />
                    </View>

                    <Text style={styles.title}>Email Address</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput 
                            style={styles.inputStyle}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder='Email Address'
                            value={email}
                            onChangeText={(newEmail) => {setEmail(newEmail)}}
                        />
                    </View>

                    <Text style={styles.title}>Password</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput 
                            style={styles.inputStyle}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder='Password'
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(newPass) => {setPass(newPass)}}
                        />
                    </View>

                    <Text style={styles.title}>Confirm Password</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput 
                            style={styles.inputStyle}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder='Confirm Password'
                            secureTextEntry={true}
                            value={conpassword}
                            onChangeText={(newConPass) => {setConPass(newConPass)}}
                        />
                    </View>

                    <Text style={styles.title}>Phone Number</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput 
                            style={styles.inputStyle}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder='Phone Number'
                            secureTextEntry={true}
                            value={phone}
                            onChangeText={(newPhone) => {setPhone(newPhone)}}
                        />
                    </View>
                </View>
                
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.buttonSend}>Send Verification Code</Text>
                </TouchableOpacity>
                
                <TextInput 
                    style={styles.verification}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder='X - X - X - X'
                    secureTextEntry={true}
                    value={phone}
                    onChangeText={(newPhone) => {setPhone(newPhone)}}
                />

                <TouchableOpacity onPress={() => {navigation.navigate('Signin')}}>
                    <Text style={styles.buttonSignup}>REGISTER</Text>
                </TouchableOpacity>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    )
}



/* SignupScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => {
            <Feather name="plus" size={24} color="black" />
        } 
    }
} */

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF8E15',
        justifyContent: 'space-between',
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: -2
          },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 15
    },
    headerText: {
        fontSize: 20,
        color: '#F3EFE4'
    },
    icon: {
        height: 50,
        width: 50,
    },
    title: {
        color: '#086788',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 3
    },
    inputStyle: {
        alignSelf: 'center',
        color: '#C4C4C4',
        fontWeight: 'bold',
        backgroundColor: 'white',
        textAlignVertical: 'center',
        height: 35,
        width: 280,
        borderRadius: 10,
        paddingLeft: 10,
        borderColor: 'black',
        borderWidth: 1
    },
    buttonSend: {
        color: '#FDF9B7',
        backgroundColor: '#084B83',
        fontWeight: 'bold',
        fontSize: 16,
        height: 50,
        width: 200,
        borderRadius: 17,
        alignSelf: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
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
    },
    verification: {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: 'white',
        textAlignVertical: 'center',
        height: 35,
        width: 100,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10
    },
})

export default SignupScreen