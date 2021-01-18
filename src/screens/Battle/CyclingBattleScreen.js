import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Header from '../../components/Header'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import {Dimensions} from 'react-native'

const CyclingBattleScreen = ({navigation}) => {
    const[name, setName] = useState('')
    const win = Dimensions.get('window');
    const ratio = win.height
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <View style={{backgroundColor: '#FBF199'}}>
                <Header title='Cycling Battle' />

                <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                >
                    <TextInput 
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder='Destination'
                        value={name}
                        onChangeText={(newName) => {setName(newName)}}
                    />
                    <Image style={{width: win.width, height: ratio}} source={require('../../../assets/FreeCyclingMap.png')} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputStyle:{
        marginHorizontal:10,
        borderWidth:3,
        borderColor:'#F3EFE4',
        borderRadius:15,
        margin:10,
        backgroundColor:'white',
        paddingLeft :10
    },
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor:'#FBF199'
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

export default CyclingBattleScreen