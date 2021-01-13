import React, { useState, useReducer } from 'react'
import createDataContext from './createDataContext'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

const reducer = (state, action) => {
    switch (action.type) {
        case 'add_friend':
            return [...state, {id: state.length+1, image: action.payload.image, name: action.payload.name}]
        /* case 'get_friends':
            return action.payload */
        /* case 'edit_friend':
            return state.map((blogPost) => {
                return (blogPost.id === action.payload.id) 
                ? action.payload 
                : blogPost
            }) */
        case 'delete_friend':
            return state.filter((friend) => friend.id !== action.payload)
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

const addFriend = dispatch => {
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
}

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
    { addFriend, deleteFriend },
    [{id: 1, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Alex'}]
)