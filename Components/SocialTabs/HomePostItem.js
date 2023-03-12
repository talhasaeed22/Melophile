import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Ionicons';
const HomePostItem = ({ profile, element, name }) => {
  return (
    <>
      <View style={{ borderColor: "lightgray", borderWidth: 1, overflow: 'hidden', backgroundColor: 'white', marginTop: 25, borderRadius: 12, display: 'flex' }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { }}>
            <Image style={{ width: Dimensions.get('window').width - 50, height: 200, }} source={{ uri: element.image }} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ paddingHorizontal: 10, fontSize: 15, marginVertical: 15, color: 'rgb(36, 45, 73)', fontWeight:'bold' }}> {element.content} </Text>
        </View>
        <View style={{ justifyContent: "space-between", flexDirection: 'row' }}>

          <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Avatar.Image size={34} source={{ uri: element.userImage }} />
            <Text style={{ marginLeft: 15, color: 'black' }}>{name}</Text>
          </View>

          <View style={{ marginRight: 20, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {!profile &&<>
                  <TouchableOpacity onPress={() => { }}>
                <FontAwesome style={{ margin: 10 }} name={'heart-o'} size={22} color={ '#181c3f'} />
              </TouchableOpacity>
              </>

                }
                <View>
                <Text style={{color:"lightgray", fontWeight:"bold"}}>7/20/2020</Text>
              </View>
              </View>
            </View>

          </View>

        </View>
      </View>

    </>
  )
}

export default HomePostItem