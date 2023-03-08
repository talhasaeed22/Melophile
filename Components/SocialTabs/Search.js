import React from 'react';
import {View, Text, ScrollView, TextInput, Alert, Dimensions, TouchableOpacity} from 'react-native';
import { IconButton, Avatar, Button } from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons'


const Search=()=>{
    return(
      
      <View style={{marginTop:50, alignItems:'center'}}>
        

          <View style={{borderWidth:1, paddingLeft:12, borderRadius:35, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <TextInput placeholder='Search Here' style={{width:'75%'}} />
            <TouchableOpacity>
            <Ionicon onPress={()=>{Alert.alert('Search Icon Pressed')}} style={{ margin: 10 }} name={'search'} size={24} color={'#181c3f'} />
            </TouchableOpacity>
          </View>

        <ScrollView>

        <View style={{marginTop:35}}>
          <Text style={{marginBottom:14, marginLeft:14, fontSize:16}} >Your Search</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between', width:Dimensions.get('window').width, padding:13, alignItems:'center', marginBottom:15}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Avatar.Image size={64} source={require('../Images/Musiclogo.jpg')} />
              <Text style={{ marginLeft: 15, fontSize:14 }}>Talha Saeed</Text>
            </View>
            <Button color='#181c3f' style={{borderRadius:20}} icon="plus" mode="contained" onPress={() => console.log('Pressed')}>
              Follow
            </Button>
          </View>

{/* ??EXTRAS */}

<View style={{flexDirection:'row', justifyContent:'space-between', width:Dimensions.get('window').width, padding:13, alignItems:'center', marginBottom:15}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Avatar.Image size={64} source={require('../Images/Musiclogo.jpg')} />
              <Text style={{ marginLeft: 15, fontSize:14 }}>Talha Saeed</Text>
            </View>
            <Button color='#181c3f' style={{borderRadius:20}} icon="plus" mode="contained" onPress={() => console.log('Pressed')}>
              Follow
            </Button>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between', width:Dimensions.get('window').width, padding:13, alignItems:'center', marginBottom:15}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Avatar.Image size={64} source={require('../Images/Musiclogo.jpg')} />
              <Text style={{ marginLeft: 15, fontSize:14 }}>Talha Saeed</Text>
            </View>
            <Button color='#181c3f' style={{borderRadius:20}} icon="plus" mode="contained" onPress={() => console.log('Pressed')}>
              Follow
            </Button>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between', width:Dimensions.get('window').width, padding:13, alignItems:'center', marginBottom:15}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Avatar.Image size={64} source={require('../Images/Musiclogo.jpg')} />
              <Text style={{ marginLeft: 15, fontSize:14 }}>Talha Saeed</Text>
            </View>
            <Button color='#181c3f' style={{borderRadius:20}} icon="plus" mode="contained" onPress={() => console.log('Pressed')}>
              Follow
            </Button>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between', width:Dimensions.get('window').width, padding:13, alignItems:'center', marginBottom:15}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Avatar.Image size={64} source={require('../Images/Musiclogo.jpg')} />
              <Text style={{ marginLeft: 15, fontSize:14 }}>Talha Saeed</Text>
            </View>
            <Button color='#181c3f' style={{borderRadius:20}} icon="plus" mode="contained" onPress={() => console.log('Pressed')}>
              Follow
            </Button>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between', width:Dimensions.get('window').width, padding:13, alignItems:'center', marginBottom:15}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Avatar.Image size={64} source={require('../Images/Musiclogo.jpg')} />
              <Text style={{ marginLeft: 15, fontSize:14 }}>Talha Saeed</Text>
            </View>
            <Button color='#181c3f' style={{borderRadius:20}} icon="plus" mode="contained" onPress={() => console.log('Pressed')}>
              Follow
            </Button>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between', width:Dimensions.get('window').width, padding:13, alignItems:'center', marginBottom:15}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Avatar.Image size={64} source={require('../Images/Musiclogo.jpg')} />
              <Text style={{ marginLeft: 15, fontSize:14 }}>Talha Saeed</Text>
            </View>
            <Button color='#181c3f' style={{borderRadius:20}} icon="plus" mode="contained" onPress={() => console.log('Pressed')}>
              Follow
            </Button>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between', width:Dimensions.get('window').width, padding:13, alignItems:'center', marginBottom:15}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Avatar.Image size={64} source={require('../Images/Musiclogo.jpg')} />
              <Text style={{ marginLeft: 15, fontSize:14 }}>Talha Saeed</Text>
            </View>
            <Button color='#181c3f' style={{borderRadius:20}} icon="plus" mode="contained" onPress={() => console.log('Pressed')}>
              Follow
            </Button>
          </View>

        </View>

      <View style={{marginTop:200}}>
        
      </View>
      </ScrollView>
      </View>
    )
}

export default Search;