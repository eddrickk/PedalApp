import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import SearchScreen from './src/screens/SearchScreen'
import FreeCyclingScreen from './src/screens/FreeCyclingScreen'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'


const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: {
              screen: SignupScreen, 
              defaultNavigationOptions: {
                title: 'Register'
              }
            } 
  }),
  mainFlow: createMaterialBottomTabNavigator({
    Search: SearchScreen,
    FreeCycling: FreeCyclingScreen
  })
})

const App = createAppContainer(switchNavigator)

export default () => {
  return <App />
}