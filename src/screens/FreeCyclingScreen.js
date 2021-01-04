import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-navigation'

const FreeCyclingScreen = ({navigation}) => {
    return <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
        <Text>Free Cycling Screen</Text>
    </SafeAreaView>
}

const styles = StyleSheet.create({

})

export default FreeCyclingScreen