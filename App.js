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
import FriendProfileScreen from './src/screens/Friends/FriendProfileScreen'
import FriendAddScreen from './src/screens/Friends/FriendAddScreen'
import FriendNearbyScreen from './src/screens/Friends/FriendNearbyScreen'
import CyclingWithFriendsScreen from './src/screens/Friends/CyclingWithFriendsScreen'
import CyclingWithFriendsStartScreen from './src/screens/Friends/CyclingWithFriendsStartScreen'
import CyclingWithFriendsStopScreen from './src/screens/Friends/CyclingWithFriendsStopScreen'
import InviteFriendScreen from './src/screens/Friends/InviteFriendScreen'
import { Provider as FriendProvider } from './src/context/FriendContext'
import { Provider as UserProvider } from './src/context/UserContext'
import { Provider as CyclingProvider } from './src/context/CyclingwithFriendContext'
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
            FreeCyclingStop: {
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
      friendFlow: createSwitchNavigator(
        {
          friendDataFlow: createStackNavigator({
            SearchFriend: {
              screen: SearchFriendScreen,
              navigationOptions: {
                title: 'Friends',
                headerShown: false
              }
            },
            FriendProfile: {
              screen: FriendProfileScreen,
              navigationOptions: {
                title: 'Friends',
                headerShown: false
              }
            },
            FriendAdd: {
              screen: FriendAddScreen,
              navigationOptions: {
                title: 'Add Friends',
                headerShown: false
              }
            },
            FriendNearby: {
              screen: FriendNearbyScreen,
              navigationOptions: {
                title: 'Nearby',
                headerShown: false
              }
            }
          }),
          cyclingWithFriendsFlow: createStackNavigator({
            cyclingFlow: createSwitchNavigator({
              CyclingWithFriends: {
                screen: CyclingWithFriendsScreen,
                navigationOptions: {
                  title: 'Friends',
                  headerShown: false
                }
              },
              CyclingWithFriendsStart: {
                screen: CyclingWithFriendsStartScreen,
                navigationOptions: {
                  title: 'Friends',
                  headerShown: false
                }
              },
              CyclingWithFriendsStop: {
                screen: CyclingWithFriendsStopScreen,
                navigationOptions: {
                  title: 'Friends',
                  headerShown: false
                }
              },
            },{
              navigationOptions: {
                headerShown: false
              }
            }),
            InviteFriend: {
              screen: InviteFriendScreen,
              navigationOptions: {
                headerShown: false
              }
            }
          })
        },{
          initialRouteName: 'friendDataFlow'
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
      barStyle: {backgroundColor: '#F3EFE4', alignItems: 'center', borderTopColor: '#FF8E15', borderTopWidth: 3},
      
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
    <CyclingProvider>
      <UserProvider>
        <FriendProvider>
          <App />
        </FriendProvider>
      </UserProvider>
    </CyclingProvider>
    
  )
  
}