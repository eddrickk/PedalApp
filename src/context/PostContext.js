import React, { useState, useReducer } from 'react'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

const PostContext = React.createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, {community_id: action.payload.community_id, post_id: action.payload.post_id, user_id: action.payload.user_id, image: action.payload.image, name: action.payload.name, 
                position: action.payload.position, content: action.payload.content, like: action.payload.like, comment_id: action.payload.comment_id}]
        case 'delete':
            /* return (
                state.filter((account) => {account.username !== action.payload.username})
            ) */
            return [...state, {}]
        /* case 'edit':
            return state.map((acc) => {
                return (acc.username === action.payload.oldusername) 
                ? action.payload 
                : acc
            }) */
        default:
            return state
    }
}

export const PostProvider = ({children}) => {
    const [posts, dispatch] = useReducer(reducer, [
        {community_id: 1, post_id: 1, user_id: 1, image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Alex', position: 'leader', content: 'Hello guys!', like: 0, comment_id: 1}
    ])

    const addPost = (community_id, post_id, user_id, image, name, position, content, like, comment_id) => {
        dispatch({type: 'add', payload: {community_id: community_id, post_id: post_id, user_id: user_id, image, name: name, position: position, content: content, like: like, comment_id: comment_id}})
    }
    
    const deletePost = () => {
        /* dispatch({ type: 'delete', payload: {username: username} })
        if (callback){
            callback()
        } */
        dispatch({type: 'delete'})
    }

    /* const editAccount = (oldusername, username) => {
        dispatch({type: 'edit', payload: {oldusername: oldusername, username: username}})
    } */

    return <PostContext.Provider value={{posts: posts, postFunc: {addPost}}}>
        {children}
    </PostContext.Provider>
}

export default PostContext