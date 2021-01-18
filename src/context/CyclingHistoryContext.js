import React, { useState, useReducer } from 'react'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

const CyclingHistoryContext = React.createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, {history_id: action.payload.history_id, id: action.payload.id, activity: action.payload.activity, time_spent: action.payload.time_spent, distance_travelled: action.payload.distance_travelled,
                average_speed: action.payload.average_speed, day: action.payload.day, date: action.payload.date, month: action.payload.month, year: action.payload.year, 
                hours_start: action.payload.hours_start, hours_end: action.payload.hours_end, minutes_start: action.payload.minutes_start, minutes_end: action.payload.minutes_end}]
        default:
            return state
    }
}

export const CyclingHistoryProvider = ({children}) => {
    const [history, dispatch] = useReducer(reducer, [])

    const addHistory = (history_id, id, activity, time_spent, distance_travelled, average_speed, day, date, month, year, hours_start, hours_end, minutes_start, minutes_end) => {
        dispatch({type: 'add', payload: {history_id: history_id, id: id, activity: activity, time_spent, distance_travelled: distance_travelled, average_speed: average_speed, 
        day: day, date: date, month: month, year: year, hours_start: hours_start, hours_end: hours_end, minutes_start: minutes_start, minutes_end: minutes_end}})
    }

    return <CyclingHistoryContext.Provider value={{history: history, fun: {addHistory}}}>
        {children}
    </CyclingHistoryContext.Provider>
}

export default CyclingHistoryContext