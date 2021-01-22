import React, { useState, useReducer } from 'react'
import createDataContext from './createDataContext'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

const reducer = (state, action) => {
    switch (action.type) {
        case 'add_user':
            return [...state, {id: state.length+1, image: action.payload.image, name: action.payload.name, username: action.payload.username, email: action.payload.email, 
            password: action.payload.password, time_spent: action.payload.time_spent, distance_travelled: action.payload.distance_travelled, average_speed: action.payload.average_speed, 
            battle_wins: action.payload.battle_wins, battle_draws: action.payload.battle_draws, battle_loses: action.payload.battle_loses, friends_number: action.payload.friends_number}]
        case 'edit_user':
            return state.map((user) => {
                return (user.id === action.payload.id) 
                ? action.payload 
                : user
            }) 
            /* case 'get_friends':
            return action.payload
        case 'edit_friend':
            return state.map((blogPost) => {
                return (blogPost.id === action.payload.id) 
                ? action.payload 
                : blogPost
            }) 
        case 'delete_friend':
            return state.filter((friend) => friend.id !== action.payload)
        case 'add_blogpost':
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

const addUser = dispatch => {
    return async (image, name, username, email, password, phone, time_spent, distance_travelled, average_speed, battle_wins, battle_draws, battle_loses, friends_number, callback) => {
        await dispatch({type: 'add_user', payload: {image: image, name: name, username: username, email: email, password: password,
        phone: phone, time_spent: time_spent, distance_travelled: distance_travelled, average_speed: average_speed, battle_wins: battle_wins,
        battle_draws: battle_draws, battle_loses: battle_loses, friends_number: friends_number}})
        if (callback){
            callback()
        }
    }
}

/* const deleteFriend = dispatch => {
    return async (id) => {
        await dispatch({ type: 'delete_friend', payload: id })
    }
} */

const editUser = dispatch => {
    return async (id, image, name, username, email, password, phone, time_spent, distance_travelled, average_speed, battle_wins, battle_draws, battle_loses, friends_number, callback) => {
        await dispatch({ type: 'edit_user', payload: {id: id, image: image, name: name, username: username, email: email, password: password,
            phone: phone, time_spent: time_spent, distance_travelled: distance_travelled, average_speed: average_speed, battle_wins: battle_wins,
            battle_draws: battle_draws, battle_loses: battle_loses, friends_number: friends_number} })
        if (callback){
            callback()
        }
    }
}

export const { Context, Provider } = createDataContext(
    reducer,
    { addUser, editUser },
    [{id: 1, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Alex', username: 'AlexXela', email: 'alex@xxx.com', password: '12dSAdauhwHWQADaw3',
        phone: '+13442****', time_spent: 3732, distance_travelled: 5840, average_speed: 0, battle_wins: 0, battle_draws: 0, battle_loses: 0, friends_number: 0},
    {id: 2, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Tom', username: 'TomTom', email: 'tom@xxx.com', password: 'dfgfsd9f8yas9daud',
        phone: '+1523****', time_spent: 0, distance_travelled: 0, average_speed: 0, battle_wins: 0, battle_draws: 0, battle_loses: 0, friends_number: 0},
    {id: 3, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Luffy', username: 'amazing_one', email: 'luffy@xxx.com', password: '3h0e83e0128eh0',
        phone: '+55763****', time_spent: 0, distance_travelled: 0, average_speed: 0, battle_wins: 0, battle_draws: 0, battle_loses: 0, friends_number: 0},
    {id: 4, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Sera', username: 'seramyname', email: 'sera@xxx.com', password: '3423d008asddsad',
        phone: '+6285**********', time_spent: 0, distance_travelled: 0, average_speed: 0, battle_wins: 0, battle_draws: 0, battle_loses: 0, friends_number: 0},
    {id: 5, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Test', username: 'test', email: 'test@xxx.com', password: '123',
        phone: '1234567890', time_spent: 0, distance_travelled: 0, average_speed: 0, battle_wins: 0, battle_draws: 0, battle_loses: 0, friends_number: 0},
    {id: 6, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Tony', username: 'tonymyname', email: 'tony@xxx.com', password: 'sdfsdfsefeoubw34',
        phone: '+6281**********', time_spent: 0, distance_travelled: 0, average_speed: 0, battle_wins: 0, battle_draws: 0, battle_loses: 0, friends_number: 0},
    {id: 7, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Lisa', username: 'lisamyname', email: 'lisa@xxx.com', password: '32w4ifhw0s8dfh0sao',
        phone: '+6285**********', time_spent: 0, distance_travelled: 0, average_speed: 0, battle_wins: 0, battle_draws: 0, battle_loses: 0, friends_number: 0}]
)