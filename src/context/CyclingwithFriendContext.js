import React, { useState, useReducer } from 'react'
import createDataContext from './createDataContext'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

const reducer = (state, action) => {
    switch (action.type) {
        case 'add_player':
            return [...state, {room_id: action.payload.room_id, id: action.payload.id, image: action.payload.image, name: action.payload.name, time: action.payload.time, 
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

/* const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts')

        dispatch({type: 'get_blogposts', payload: response.data})
    }
} */

const addPlayer = dispatch => {
    return async (room_id, id, image, name, time, distance, avgspd, callback) => {
        await dispatch({type: 'add_player', payload: {room_id: room_id, id: id, image: image, name: name, time: time, distance: distance, avgspd: avgspd}})
        if (callback){
            callback()
        }
    }
}
/* 
const deleteFriend = dispatch => {
    return async (id) => {
        await dispatch({ type: 'delete_friend', payload: id })
    }
} */

const editPlayer = dispatch => {
    return async (room_id, id, name, time, distance, avgspd) => {
        await dispatch({ type: 'edit_player', payload: {room_id, id: id, name: name, time: time, distance: distance, avgspd: avgspd} })
        if (callback){
            callback()
        }
    }
}

export const { Context, Provider } = createDataContext(
    reducer,
    { addPlayer, editPlayer },
    []
)