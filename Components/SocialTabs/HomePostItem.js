import { View, Text, Dimensions, TouchableOpacity, Image, Linking } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feathre from 'react-native-vector-icons/Feather';
import Evil from 'react-native-vector-icons/EvilIcons'
const HomePostItem = ({ profile, element, name }) => {
  return (
    <>
      <View style={{ borderColor: "lightgray", elevation:5, overflow: 'hidden', backgroundColor: 'white', marginVertical: 20, borderRadius: 12, display: 'flex' }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { }}>
            <Image style={{ width: Dimensions.get('window').width - 50, height: 200, borderRadius:12 }} source={{ uri: element.image }} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ paddingHorizontal: 10, fontSize: 15, marginVertical: 15, color: 'rgb(36, 45, 73)', fontWeight: 'bold' }}> {element.content} </Text>
        </View>
        <TouchableOpacity onPress={()=>{
          Linking.openURL(element.audio)
        }} style={{ display: 'flex', flexDirection: 'row', borderRadius:20 }}>
            <Image style={{ width: Dimensions.get('window').width - 50, height:50 }}  source={require('../Images/sound.jpg')} />
            
            {/* <Feathre name='download' size={30} /> */}
          </TouchableOpacity>
        <View style={{ justifyContent: "space-between", flexDirection: 'row',paddingRight:10, paddingBottom:10 }}>

          <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Avatar.Image size={34} source={{ uri: element.userImage }} />
            <Text style={{ marginLeft: 15, color: 'black' }}>{name}</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {profile ? <TouchableOpacity onPress={() => { }}>
              <Evil style={{ margin: 10 }} name={'trash'} size={30} color={'red'} />
            </TouchableOpacity> : <TouchableOpacity onPress={() => { }}>
              <FontAwesome style={{ margin: 10 }} name={'heart-o'} size={22} color={'#181c3f'} />
            </TouchableOpacity>}
            <Text style={{ color: "lightgray", fontWeight: "bold" }}>{element.date}/{element.month}/{element.year}</Text>


          </View>

        </View>
      </View>

    </>
  )
}

export default HomePostItem