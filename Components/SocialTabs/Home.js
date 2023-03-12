import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import HomePostItem from './HomePostItem'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import CreatePostModal from './CreatePostModal';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Home = () => {
  const url = 'http://192.168.100.122:5000';
  const [postModal, setPostModal] = useState(false)
  const [loading, setLoading] = useState(false)
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
          if (element.user !== json.userId) {
            postData.push(element)
          }
        })
      }
      setList(postData)
      setPostLoading(false);
    
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

  const onSubmit = async (image, content, audio) => {
    setLoading(true);
    let imageUrl = 'false';
    let audioUrl = 'false'
    if (image !== '') {
      imageUrl = await uploadImage(image);
    }

    if (audio !== '') {
      audioUrl = await uploadAudio(audio)
    }
    
    const date = new Date();
    const response = await fetch(`${url}/api/post/addPost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
      body: JSON.stringify({ content: content, name: name, userImage: userImage, image: imageUrl, audio: audioUrl, date:date.getDate(), month:date.getMonth() + 1, year: date.getFullYear() })
    });
    const json = await response.json();
    console.log(json)
    Alert.alert('Success', "Post Added")
    setLoading(false);
    setPostModal(false);

  }

  const uploadAudio = async (result) => {
    const response = await fetch(result[0].uri);
    const file = await response.blob();
    const StorageRef = storage().ref(`audios/${result[0].name}`)
    const task = StorageRef.put(file)
    try {
      await task
      const url = await StorageRef.getDownloadURL()
      return url
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const uploadImage = async (image) => {
    const uploadUri = image

    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.')

    filename = name + Date.now() + '.' + extension

    const StorageRef = storage().ref(`photos/${filename}`)

    const task = StorageRef.putFile(uploadUri)

    try {
      await task

      const url = await StorageRef.getDownloadURL()
      return url
    } catch (error) {
      console.log(error)
      return null
    }

  }
  return (
    <ScrollView>
      <TouchableOpacity onPress={() => { setPostModal(true) }} style={{ marginHorizontal: 20 }}>
        <View style={{ borderWidth: 1, width: "100%", borderColor: 'lightgray', padding: 10, marginTop: 20, paddingBottom: 70, borderRadius: 10, }}>
          <Text>What's on your mind......</Text>
        </View>
        <View style={{ alignSelf: 'flex-end' }}>
          <Button style={{ marginVertical: 10, borderRadius: 10, }} textColor='white' buttonColor='#181c3f' >Create New Post</Button>

        </View>
      </TouchableOpacity>

      <View style={{ display: 'flex', alignItems: "center" }}>
        { postLoading ? <ActivityIndicator style={{ marginVertical: 10 }} color="#181c3f" /> : list.length === 0 ? <View style={{ display: "flex", alignItems: "center", marginTop: 150, }}>
          <Icon name='folder-text-outline' size={35} color='black' />
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>No Posts Added</Text>
        </View>  : list.map((post, index) => {
          return <HomePostItem key={index} />
        })}
      </View>

      <View style={{ marginVertical: 50 }}></View>
      <CreatePostModal visible={postModal} onClose={() => { setPostModal(false) }} onSubmit={onSubmit} loading={loading} />

    </ScrollView>
  )
}

export default Home