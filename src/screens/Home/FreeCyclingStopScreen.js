import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, ScrollView, Image, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '../../components/Header'

const FreeCyclingStopScreen = ({navigation}) => {
    const time_spent = navigation.getParam('time_spent')
    const distance_travelled = navigation.getParam('distance_travelled')
    const average_speed = navigation.getParam('average_speed')
    const [hours, setHours] = useState('00')
    const [minutes, setMinutes] = useState('00')
    const [seconds, setSeconds] = useState('00')
    const [distance, setDistance] = useState('0')
    const [avg, setAvg] = useState('0')
    const win = Dimensions.get('window')
    return (
        <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Header title='Home' />
                
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{
                        flex: 1,
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 1,
                            height: -2
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 5
                    }} onPress={() => {navigation.navigate('Search')}}>
                        <Text style={styles.buttonSearch}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 1,
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 1,
                            height: -2
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 5
                    }} onPress={() => {navigation.navigate('FreeCycling')}}>
                        <Text style={styles.buttonFreeCycling}>FreeCycling</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.detail}>
                    <Text style={{fontSize: 24, fontWeight: 'bold', alignSelf: 'center', marginVertical: 30}}>Cycling Ended</Text>
                    <Text style={{fontSize: 18, alignSelf: 'center', marginBottom: 10}}>Result</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center',
                                    width: win.width,
                                    borderTopColor: '#FF8E15',
                                    borderBottomColor: '#FF8E15',
                                    borderTopWidth: 2,
                                    borderBottomWidth: 2}}>
                        <View>
                            <Text style={styles.textStyle}>Time Spent</Text>
                            <Text style={styles.textStyle}>Distance Travelled</Text>
                            <Text style={styles.textStyle}>Avg. Speed</Text>
                        </View>
                        <View>
                            <Text style={styles.textStyle}>{Math.floor(time_spent/3600)} H {Math.floor((time_spent%3600)/60)} M {(time_spent%3600)%60} s</Text>
                            <Text style={styles.textStyle}>{distance_travelled} m</Text>
                            <Text style={styles.textStyle}>{average_speed.toFixed(2)} m/s</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                        <TouchableOpacity onPress={() => {navigation.navigate('FreeCycling')}}>
                            <Text style={styles.buttonBreak}>Break</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate()}}>
                            <Image style={styles.shareicon} source={require('../../../assets/Share_Blue.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    
    detail: {
        alignSelf: 'center'
    },
    textStyle: {
        fontSize: 20,
        paddingHorizontal: 25,
        paddingVertical: 20
    },
    buttonFreeCycling: {
        color: '#086788',
        backgroundColor: '#FFD8AD',
        fontWeight: 'bold',
        fontSize: 16,
        height: 40,
        borderBottomRightRadius: 12,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    buttonSearch: {
        color: '#F3EFE4',
        backgroundColor: '#FF8E15',
        fontSize: 16,
        height: 40,
        borderBottomLeftRadius: 12,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    buttonBreak: {
        color: '#FDF9B7',
        backgroundColor: '#084B83',
        fontWeight: 'bold',
        fontSize: 16,
        height: 45,
        width: 230,
        borderRadius: 17,
        alignSelf: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
        marginRight: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: -2
          },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
    },
    shareicon: {
        height: 50,
        width: 50,
    },
})

export default FreeCyclingStopScreen