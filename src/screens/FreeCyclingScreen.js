import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const FreeCyclingScreen = ({navigation}) => {
    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
            <ScrollView
                style={[styles.scrollView, styles.greyBackground]}
                showsVerticalScrollIndicator={false}
            >
                <LinearGradient colors={['#FF8E15', 'transparent']} style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Home</Text>
                        <Image style={styles.icon} source={require('../../assets/icon.png')} />
                    </View>
                </LinearGradient>
                <View>
                    <Text style={[styles.textBlue , styles.textStart]} > Start Free Cycling</Text>
                </View>
                <View>
                    <Text style={styles.textStatus} >Time</Text>
                    <Text style={styles.textStatus} >Distance</Text>
                    <Text style={styles.textStatus} >Avg. Speed</Text>

                </View>
            </ScrollView>
        </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greyBackground: {
        backgroundColor: '#F3EFE4'
    },
    header: {
        flexDirection: 'row',
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
        textAlignVertical: "center",
        color: '#F3EFE4',
        paddingLeft: 10
    },
    icon: {
        height: 50,
        width: 50,
    },
    textBlue: {
        fontWeight: 'bold',
        color:'#086788'
    },
    textStart: {
        fontSize: 20,
        textAlign: 'center'
    },
    textStatus: {
        fontSize: 18,
        fontWeight:'bold',
        textAlign:'left',
        paddingLeft: 60,
        paddingTop:25
    }
})

export default FreeCyclingScreen