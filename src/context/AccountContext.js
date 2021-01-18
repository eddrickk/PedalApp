import React, { useState, useReducer } from 'react'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

const AccountContext = React.createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, {username: action.payload.username}]
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

export const AccountProvider = ({children}) => {
    const [account, dispatch] = useReducer(reducer, [])

    const addAccount = (username) => {
        dispatch({type: 'add', payload: {username: username}})
    }
    
    const deleteAccount = () => {
        /* dispatch({ type: 'delete', payload: {username: username} })
        if (callback){
            callback()
        } */
        dispatch({type: 'delete'})
    }

    /* const editAccount = (oldusername, username) => {
        dispatch({type: 'edit', payload: {oldusername: oldusername, username: username}})
    } */

    return <AccountContext.Provider value={{account: account, func: {addAccount, deleteAccount}}}>
        {children}
    </AccountContext.Provider>
}

export default AccountContext