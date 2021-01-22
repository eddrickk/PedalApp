import React, { useState, useReducer } from 'react'
import createDataContext from './createDataContext'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

const CyclingBattleContext = React.createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'add_player':
            return [...state, {room_id: action.payload.room_id, code: action.payload.code, status: action.payload.status, room_master: action.payload.room_master, winner: action.payload.winner, id: action.payload.id, image: action.payload.image, name: action.payload.name, time: action.payload.time, 
            distance: action.payload.distance, avgspd: action.payload.avgspd}]
        /* case 'get_friends':
            return action.payload */
        case 'edit_player':
            return state.map((player) => {
                return (player.id === action.payload.id && player.room_id === action.payload.room_id) 
                ? action.payload 
                : player
            })
        /* case 'delete_friend':
            return state.filter((friend) => friend.id !== action.payload) */
        /* case 'add_blogpost':
            return [...state, {id: Math.floor(Math.random() * 99999), title: action.payload.title, content: action.payload.content}] */
        default:
            return state
    }
}

export const CyclingBattleProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, [{
        room_id: 1, code: 'HELLO', status: 'open', room_master: true, winner: false, id: 3, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Luffy',
        time: 0, distance: 0, avgspd: 0},
        {room_id: 1, code: 'HELLO', status: 'open', room_master: false, winner: false, id: 7, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Lisa',
        time: 0, distance: 0, avgspd: 0},
        {room_id: 1, code: 'HELLO', status: 'open', room_master: false, winner: false, id: 6, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Tony',
        time: 0, distance: 0, avgspd: 0}])

    const addPlayer = async (room_id, code, status, room_master, winner, id, image, name, time, distance, avgspd, callback) => {
        await dispatch({type: 'add_player', payload: {room_id: room_id, code: code, status: status, room_master: room_master, winner: winner, id: id, image: image, name: name, time: time, distance: distance, avgspd: avgspd}})
        if (callback){
            callback()
        }
    }
    /* 
    const deleteFriend = dispatch => {
        return async (id) => {
            await dispatch({ type: 'delete_friend', payload: id })
        }
    } */

    const editPlayer = async (room_id, code, status, room_master, winner, id, image, name, time, distance, avgspd) => {
        await dispatch({ type: 'edit_player', payload: {room_id, code: code, status: status, room_master: room_master, winner: winner, id: id, image: image, name: name, time: time, distance: distance, avgspd: avgspd} })
        if (callback){
            callback()
        }
    }

    return <CyclingBattleContext.Provider value={{battle: state, funBattle: {addPlayer, editPlayer}}}>
        {children}
    </CyclingBattleContext.Provider>
}

export default CyclingBattleContext