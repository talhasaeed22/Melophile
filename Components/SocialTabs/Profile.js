import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { ActivityIndicator, Avatar, Button } from 'react-native-paper'
import HomePostItem from './HomePostItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Profile = () => {
  const url = 'http://192.168.100.122:5000';

  const isFocused = useIsFocused();
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [userImage, setUserImage] = useState('')

  useEffect(() => {
    setData();
    loadData();
    
  }, [isFocused])

  const [postLoading, setPostLoading] = useState(false)
  const [list, setList] = useState([])


  const loadData = async () => {
    let postData = []
    setPostLoading(true);
    const response = await fetch(`${url}/api/post/fetchHomePosts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },

    });
    const json = await response.json();
    // console.log(json)
    
      if(json.allPosts !== undefined){
        json.allPosts.map((element) => {
          if (element.user === json.userId) {
            postData.push(element)
          }
        })
        setList(postData)
        setPostLoading(false);
      }
    
  }

  const setData = async () => {
    const namme = await AsyncStorage.getItem('name')
    const tokeen = await AsyncStorage.getItem('token')
    const emmail = await AsyncStorage.getItem('email')
    const imagee = await AsyncStorage.getItem('image')
    setName(namme);
    setToken(tokeen);
    setEmail(emmail);
    setUserImage(imagee)
  }
  return (
    <>
      <View style={{ flex: 0.6, elevation: 10, backgroundColor:'white', justifyContent: 'center', alignItems: 'center', borderRadius: 20,  borderBottomColor:"lightgray", display:"flex" }}>
        <Avatar.Image source={{uri:userImage !== '' ? userImage : 'https://placeimg.com/640/480/any'}} size={70} />
        <Text style={{marginTop:10,fontWeight:"bold" ,fontSize:30, color:'rgb(36, 45, 73)'}}>{name}</Text>
        <Text style={{ fontSize:17, color:"rgb(169 175 192)"}}>{email}</Text>
        <TouchableOpacity>
        <Button icon={()=>(<Icon name='square-edit-outline' size={17} color='white' />)} buttonColor='rgb(36, 45, 73)' textColor='white' style={{marginVertical:10, borderRadius:10}}>Edit Profile</Button>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignItems:"center",  }}>
        <ScrollView>
          { postLoading ? <ActivityIndicator style={{ marginVertical: 10 }} color="#181c3f" /> : list.length === 0 ? <View style={{ display: "flex", alignItems: "center", marginTop: 150, }}>
          <Icon name='folder-text-outline' size={35} color='black' />
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>No Posts Added</Text>
        </View>  : list.map((post, index) => {
          return <HomePostItem name={name} element={post} profile={true} key={index} />
        })}
        </ScrollView>
      </View>

      <View style={{ marginVertical: 50 }}></View>

    </>
  )
}

export default Profile