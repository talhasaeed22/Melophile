import React, { useState, useEffect, useContext } from 'react';
import { Button, Image, View, Text, Alert } from 'react-native';
import FIcon from 'react-native-vector-icons/Ionicons';
import ModeContext from './Context/ModeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDrawerStatus } from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { Drawer, Avatar, Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from '@react-navigation/native';

const MyDrawer = (props) => {

  const { state } = props
  const { routes, index } = state; //Not sure about the name of index property. Do check it out by logging the 'state' variable.
  const focusedRoute = routes[index].name;

  const isFocus = useIsFocused();
  const context = useContext(ModeContext)
  const isOpen = useDrawerStatus();
  const { switchMode, mode } = context
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const [change, setChange] = useState(false)
  const handleMode = () => {
    switchMode();
    props.switchDarkorLight()
  }

  useEffect(() => {
    setData();
  }, [isOpen, change, isFocus])

  const setData = async () => {
    const namme = await AsyncStorage.getItem('name')
    const tokeen = await AsyncStorage.getItem('token')
    const emmail = await AsyncStorage.getItem('email')
    const immage = await AsyncStorage.getItem('image')

    setName(namme);
    setToken(tokeen);
    setEmail(emmail)
    setImage(immage)
  }


  const [screen, setScreen] = useState(1);
  const [dark, setMode] = useState(false)

  const handleSignout = async ()=>{
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('name')
    await AsyncStorage.removeItem('email')
    await AsyncStorage.removeItem('image')
    await AsyncStorage.removeItem('favourite')
    Alert.alert('Signed Out Successfully')
    setChange(true)
    props.navigation.navigate('Login')
}

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView  {...props}>
        <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <Image style={{ width: 90, height: 100 }} source={mode === 'light' ? require('./Images/logo.png') : require('./Images/whitelogo.png')} />
          <Text style={{ fontSize: 31, color: mode === 'light' ? '#181c3f' : 'white', fontWeight: 'bold', fontStyle: 'italic' }}>ELOPHILE </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: "center", padding: 15 }}>
         {token !== null?  <Avatar.Image source={{uri:image !== '' ? image : 'https://media.istockphoto.com/id/535695503/photo/pakistan-monument-islamabad.jpg?s=612x612&w=0&k=20&c=bNqjdf8L-5igcRB89DdMgx0kNOmyeo1J_zzXmoxxl8w='}} size={50} /> : ''}
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ marginLeft: 15, fontSize: 15, color: mode === 'light' ? 'black' : 'white', fontWeight: 'bold' }}>{token !== null ? `${name}` : ''}</Text>
            <Text style={{ marginLeft: 15, fontWeight: 'bold', color: mode === 'light' ? 'gray' : 'white' }}>{token !== null ? `${email}` : ''}</Text>
          </View>

        </View>
        <View style={{ marginTop: 15, flexDirection: 'column', marginLeft: 15 }}>

          <DrawerItem onPress={() => { props.navigation.navigate('Home'); setScreen(1) }} style={focusedRoute === 'Home' ? { backgroundColor: mode === 'light' ? '#181c3f' : 'white' } : {}}
            icon={({ color, size }) => (<Icon name="home-outline" size={21} color={focusedRoute === 'Home' ? (mode === 'light' ? 'white' : 'black') : mode === 'light' ? 'black' : 'white'} />)}
            label={() => (<Text style={{ color: focusedRoute === 'Home' ? (mode === 'light' ? 'white' : 'black') : mode === 'light' ? 'black' : 'white', fontSize: 15 }}>Home</Text>)}

          />

          <DrawerItem onPress={() => { props.navigation.navigate('Player'); setScreen(3) }} style={focusedRoute === 'Player' ? { backgroundColor: mode === 'light' ? '#181c3f' : 'white' } : {}}
            icon={({ color, size }) => (<FIcon name="musical-notes-outline" size={21} color={focusedRoute === 'Player' ? (mode === 'light' ? 'white' : 'black') : mode === 'light' ? 'black' : 'white'} />)}
            label={() => (<Text style={{ color: focusedRoute === 'Player' ? (mode === 'light' ? 'white' : 'black') : mode === 'light' ? 'black' : 'white', fontSize: 15 }}>Player</Text>)}

          />
          <DrawerItem onPress={() => { props.navigation.navigate('Social'); setScreen(4) }} style={focusedRoute === 'Social' ? { backgroundColor: mode === 'light' ? '#181c3f' : 'white' } : {}}
            icon={({ color, size }) => (<FIcon name="earth-outline" size={21} color={focusedRoute === 'Social' ? (mode === 'light' ? 'white' : 'black') : mode === 'light' ? 'black' : 'white'} />)}
            label={() => (<Text style={{ color: focusedRoute === 'Social' ? (mode === 'light' ? 'white' : 'black') : mode === 'light' ? 'black' : 'white', fontSize: 15 }}>Social</Text>)}

          />
          <DrawerItem onPress={() => { props.navigation.navigate('Setting'); setScreen(5) }} style={focusedRoute === 'Setting' ? { backgroundColor: mode === 'light' ? '#181c3f' : 'white' } : {}}
            icon={({ color, size }) => (<FIcon name="settings-outline" size={21} color={mode === 'light' ? 'black' : 'white'} />)}
            label={() => (<Text style={{ color: focusedRoute === 'Setting' ? (mode === 'light' ? 'white' : 'black') : mode === 'light' ? 'black' : 'white', fontSize: 15 }}>Settings</Text>)}

          />
        </View>

        <View style={{ borderTopWidth: 1, marginTop: 15, borderTopColor: 'lightgray' }}></View>
        <View style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15, color: mode === 'dark' ? 'white' : 'gray' }}> {mode === 'dark' ? 'Light Mode' : 'Dark Mode'} </Text>
          <View style={{ backgroundColor: mode === 'light' ? '' : 'white', borderRadius: 145 }} >

            <Switch color={mode === 'light' ? '#181c3f' : 'white'} value={mode} onValueChange={handleMode} />
          </View>
        </View>

      </DrawerContentScrollView>
      <Drawer.Section>
        <View style={{ borderTopWidth: 1, borderTopColor: 'lightgray' }}></View>
        
        {token == null ? <DrawerItem onPress={() => { props.navigation.navigate('Login') }}
          icon={({ color, size }) => (<Icon name="login" size={21} color={'black'} />)}
          label={() => (<Text style={{ fontSize: 15, color: mode === 'light' ? 'gray' : 'white' }}>Login</Text>)}
        /> : <DrawerItem onPress={handleSignout}
        icon={({ color, size }) => (<Icon name="login" size={21} color={'black'} />)}
        label={() => (<Text style={{ fontSize: 15, color: mode === 'light' ? 'gray' : 'white' }}>Signout</Text>)}
      />}
      </Drawer.Section>
    </View>
  )
}

export default MyDrawer;
