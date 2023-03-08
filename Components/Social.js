import React, {useContext} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
import Home from './SocialTabs/Home'
import Search  from './SocialTabs/Search';
import Favourite from './SocialTabs/Favourtie';
import Profile from './SocialTabs/Profile';
import ModeContext from './Context/ModeContext';


export default function Social() {
  const context = useContext(ModeContext)
  const { mode } = context

  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarStyle: { position:'absolute',
      bottom:30,
      backgroundColor:mode === 'light' ? 'white' : 'black',
      marginHorizontal:20,
      borderRadius:10,
      shadowColor:'#000',
      shadowOpacity:0.06,
      shadowOffset:{
        width:10,
        height:10
      },
      paddingTop:7

     },
      
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'ios-home-outline';
          color = focused ? mode === 'light' ? '#181c3f' : 'white' : 'gray'

        }
        else if (route.name === 'Favourite') {
          iconName = 'heart-outline';
          
          color = focused ? mode === 'light' ? '#181c3f' : 'white' : 'gray'
        }
        else if (route.name === 'Search') {
          iconName = 'search';
          
          color = focused ? mode === 'light' ? '#181c3f' : 'white' : 'gray'
        }
        else if (route.name === 'Profile') {
          iconName = 'man-outline';
          
          color = focused ? mode === 'light' ? '#181c3f' : 'white' : 'gray'
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      }
    })}>
        <Tab.Screen name="Home" component={Home}options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
        }} />
        <Tab.Screen name="Search" component={Search}options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
        }} />
        <Tab.Screen name="Favourite" component={Favourite}options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
        }} />
        <Tab.Screen name="Profile" component={Profile}options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
        }} />
      </Tab.Navigator>
      
  );
}
