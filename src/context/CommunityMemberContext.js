import React, { useState, useReducer } from 'react'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

const CommunityMemberContext = React.createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, {community_id: action.payload.community_id, community_image: action.payload.community_image, community_name: action.payload.community_name, image: action.payload.image, name: action.payload.name, user_id: action.payload.user_id, position: action.payload.position}]
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

export const CommunityMemberProvider = ({children}) => {
    const [member, dispatch] = useReducer(reducer, [{community_id: 1, community_image: 'https://www.iconsdb.com/icons/preview/color/FF8E15/conference-xxl.png', community_name: 'Wind Breakers', image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Alex',
     user_id: 1, position: 'leader'}, {community_id: 1, community_image: 'https://www.iconsdb.com/icons/preview/color/FF8E15/conference-xxl.png', community_name: 'Wind Breakers', image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Tom', user_id: 2, position: 'member'}, 
     {community_id: 1, community_image: 'https://www.iconsdb.com/icons/preview/color/FF8E15/conference-xxl.png', community_name: 'Wind Breakers', image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Test', user_id: 5, position: 'member'},
    {community_id: 2, community_image: 'https://www.iconsdb.com/icons/preview/color/FF8E15/conference-xxl.png', community_name: 'Sentinels', image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Luffy', user_id: 3, position: 'leader'}, {community_id: 2, community_image: 'https://www.iconsdb.com/icons/preview/color/FF8E15/conference-xxl.png',
    community_name: 'Sentinels', image: 'https://www.iconsdb.com/icons/preview/blue/contacts-xxl.png', name: 'Sera', user_id: 4, position: 'member'}])

    const addMember = (community_id, community_image, community_name, image, name, user_id, position) => {
        dispatch({type: 'add', payload: {community_id: community_id, community_image: community_image, community_name: community_name, image: image, name: name, user_id: user_id, position: position}})
    }
    
    const deleteMembert = () => {
        /* dispatch({ type: 'delete', payload: {username: username} })
        if (callback){
            callback()
        } */
        dispatch({type: 'delete'})
    }

    /* const editAccount = (oldusername, username) => {
        dispatch({type: 'edit', payload: {oldusername: oldusername, username: username}})
    } */

    return <CommunityMemberContext.Provider value={{member: member, memFunc: {addMember}}}>
        {children}
    </CommunityMemberContext.Provider>
}

export default CommunityMemberContext