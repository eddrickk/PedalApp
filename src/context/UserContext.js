import React, { useState, useReducer } from 'react'
import createDataContext from './createDataContext'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

const reducer = (state, action) => {
    /* switch (action.type) {
        case 'add_friend':
            return [...state, {id: state.length+1, image: action.payload.image, name: action.payload.name}]
        case 'get_friends':
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
            return [...state, {id: Math.floor(Math.random() * 99999), title: action.payload.title, content: action.payload.content}]
        default:
            return state
    } */
}

/* const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts')

        dispatch({type: 'get_blogposts', payload: response.data})
    }
} */

/* const addFriend = dispatch => {
    return async (image, name, callback) => {
        await dispatch({type: 'add_friend', payload: {image: image, name: name}})
        if (callback){
            callback()
        }
    }
}

const deleteFriend = dispatch => {
    return async (id) => {
        await dispatch({ type: 'delete_friend', payload: id })
    }
} */

/* const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await dispatch({ type: 'edit_friend', payload: {id: id, title: title, content: content} })
        if (callback){
            callback()
        }
    }
} */

export const { Context, Provider } = createDataContext(
    reducer,
    {},
    [{id: 1, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Alex', username: 'AlexXela', email: 'alex@xxx.com', password: '12dSAdauhwHWQADaw3',
        phone: '+13442****', time_spent: 3732, distance_travelled: 5840, average_speed: 0, battle_wins: 0, battle_draws: 0, battle_loses: 0, friends_number: 0},
    {id: 2, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Tom', username: 'TomTom', email: 'tom@xxx.com', password: 'dfgfsd9f8yas9daud',
        phone: '+1523****', time_spent: 0, distance_travelled: 0, average_speed: 0, battle_wins: 0, battle_draws: 0, battle_loses: 0, friends_number: 0},
    {id: 3, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Luffy', username: 'amazing_one', email: 'luffy@xxx.com', password: '3h0e83e0128eh0',
        phone: '+55763****', time_spent: 0, distance_travelled: 0, average_speed: 0, battle_wins: 0, battle_draws: 0, battle_loses: 0, friends_number: 0},
    {id: 4, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Sera', username: 'seramyname', email: 'sera@xxx.com', password: '3423d008asddsad',
        phone: '+6285**********', time_spent: 0, distance_travelled: 0, average_speed: 0, battle_wins: 0, battle_draws: 0, battle_loses: 0, friends_number: 0}]
)