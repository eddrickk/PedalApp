import React from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'

const Header = ({title}) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
            <Image style={styles.icon} source={require('../../assets/icon.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF8E15',
        justifyContent: 'space-between',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0,
        shadowRadius: 8,
        elevation: 8
    },
    headerText: {
        fontSize: 26,
        color: '#F3EFE4',
        marginLeft:10
    },
    icon: {
        height: 50,
        width: 50,
    },
})

export default Header