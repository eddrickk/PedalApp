import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation'
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import SearchScreen from './src/screens/Home/SearchScreen'
import FreeCyclingScreen from './src/screens/Home/FreeCyclingScreen'
import FreeCyclingStartScreen from './src/screens/Home/FreeCyclingStartScreen'
import FreeCyclingStopScreen from './src/screens/Home/FreeCyclingStopScreen'
import SearchFriendScreen from './src/screens/Friends/SearchFriendScreen'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'

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
      }
    } 
  }),
  mainFlow: createMaterialBottomTabNavigator(
    {
      homeFlow: createSwitchNavigator(
        {
          Search: {
            screen: SearchScreen,
            navigationOptions: {
              title: 'Home',
              headerShown: false
            }
          },
          freeCyclingFlow: createSwitchNavigator({
            FreeCycling: {
              screen: FreeCyclingScreen,
              navigationOptions: {
                title: 'Home',
                headerShown: false
              }
            },
            FreeCyclingStart: {
              screen: FreeCyclingStartScreen,
              navigationOptions: {
                title: 'Home',
                headerShown: false
              }
            },
            freeCyclingStop: {
              screen: FreeCyclingStopScreen,
              navigationOptions: {
                title: 'Home',
                headerShown: false
              }
            },
          })
          
        },{
          initialRouteName: 'Search'
        }
        ),
      friendFlow: createStackNavigator(
        {
          SearchFriend: SearchFriendScreen
        }
      )
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          switch (routeName){
            case 'homeFlow':
              return focused 
                ? <Image
                    source={ require('./assets/Home.png') }
                    style={{ width: 40, height: 40 }} /> 
                : <Image
                  source={ require('./assets/Home_Blue.png') }
                  style={{ width: 40, height: 40, }} />
            case 'friendFlow':
              return focused 
                ? <Image
                    source={ require('./assets/Friends.png') }
                    style={{ width: 40, height: 40, }} /> 
                : <Image
                  source={ require('./assets/Friends_Blue.png') }
                  style={{ width: 40, height: 40, }} />
          }
        },
        
      }),
      activeColor: 'transparent',
      inactiveColor: 'transparent',
      barStyle: {backgroundColor: '#F3EFE4', alignItems: 'center'},
      
      tabBarOptions: {
        activeTintColor: '#FF8E15',
        inactiveTintColor: '#084B83',
        
      },
    },
  )
})


const App = createAppContainer(switchNavigator)

export default () => {
  return (
      <App />
  )
  
}