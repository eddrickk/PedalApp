import React, { useReducer } from 'react'

export default (reducer, actions, initialState) => {
    const Context = React.createContext()

    const Provider = ({children}) => {
        const [state, dispatch] = useReducer(reducer, initialState)

        // actions = { addBlogPost: (dispatch) => { return () => {} } }
        const boundActions = {}
        for (let i in actions){
            boundActions[i] = actions[i](dispatch)
            // actions[i] === actions.'i in actions' === actions.addBlogPost, actions....
        }
        //console.log(boundActions)
    
        return <Context.Provider value={{data: state, ...boundActions}}>
            {children}
        </Context.Provider>
    }

    return { Context, Provider }
}
