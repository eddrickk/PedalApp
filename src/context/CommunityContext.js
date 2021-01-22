import React, { useState, useReducer } from 'react'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

const CommunityContext = React.createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, {id: action.payload.id, image: action.payload.image, name: action.payload.name, desc: action.payload.desc, maxMem: action.payload.maxMem, status: action.payload.status,
                 post_id: action.payload.post_id, story_id: action.payload.story_id, chat_id: action.payload.chat_id}]
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

export const CommunityProvider = ({children}) => {
    const [community, dispatch] = useReducer(reducer, [
    {id: 1, image: 'https://www.iconsdb.com/icons/preview/color/FF8E15/conference-xxl.png', name: 'Wind Breakers', desc: 'Keep Cycling', maxMem: 20,
    status: 'open', post_id: 1, story_id: 1, chat_id: 1},
    {id: 2, image: 'https://www.iconsdb.com/icons/preview/color/FF8E15/conference-xxl.png', name: 'Sentinels', desc: 'Keep Riding', maxMem: 10,
    status: 'open', post_id: 2, story_id: 2, chat_id: 2}])

    const addCommunity = (id, image, name, desc, maxMem, status, post_id, story_id, chat_id) => {
        dispatch({type: 'add', payload: {id: id, image: image, name: name, desc: desc, maxMem: maxMem, status: status, post_id: post_id, story_id: story_id, chat_id: chat_id}})
    }
    
    const deleteMember = () => {
        /* dispatch({ type: 'delete', payload: {username: username} })
        if (callback){
            callback()
        } */
        dispatch({type: 'delete'})
    }

    /* const editAccount = (oldusername, username) => {
        dispatch({type: 'edit', payload: {oldusername: oldusername, username: username}})
    } */

    return <CommunityContext.Provider value={{community: community, comFunc: {addCommunity}}}>
        {children}
    </CommunityContext.Provider>
}

export default CommunityContext