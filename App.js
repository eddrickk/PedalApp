import React from 'react'
import { Image } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import SearchScreen from './src/screens/SearchScreen'
import FreeCyclingScreen from './src/screens/FreeCyclingScreen'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'


const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signin: {
      screen: SigninScreen, 
      title: 'Sign in',
      navigationOptions: {
        headerShown: false
      }
    } ,
    Signup: {
      screen: SignupScreen, 
      navigationOptions: {
        headerShown: false
        /* title: 'Register',
        color: '#F3EFE4',
        headerStyle: {
          backgroundColor: '#FF8E15',
        },
        headerTitleStyle: {
          color: '#F3EFE4',
          alignSelf: 'center'
        } */
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