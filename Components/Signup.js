import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Anticon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { IconButton, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

export default function Signup({ navigation }) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [showpass, setShowPass] = useState(false);



    const handleNext = async () => {
        if (email === '' || name === '' || pass === '') {
            Alert.alert('Please Fill all the fields')
        } 
        else if (pass.length < 6) {
            Alert.alert('Password Should be greater than 6')
        }
        else {
            navigation.navigate('ChooseFavourite', { email, name, pass })
        }
    }


    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ backgroundColor: 'white' }}>

                <View style={{ backgroundColor: '#181c3f', alignItems: 'center', borderBottomLeftRadius: 300, height: 320, width: Dimensions.get('window').width }} >
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <Image style={{ width: 100, height: 100 }} source={require('./Images/whitelogo.png')} />
                        <Text style={{ fontSize: 31, color: 'white', fontWeight: 'bold', }}>ELOPHILE </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, fontStyle: 'italic', color: 'white' }}> An Intelligent Music Player App </Text>
                    </View>
                    <View style={{ marginTop: 13, }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}> Signup Form </Text>
                    </View>
                </View>
            </View>

            <View style={{ paddingLeft: 40, paddingRight: 40 }}>

                <View>


                    <TextInput onChangeText={setName} left={<TextInput.Icon name="account" color='#181c3f' size={22} />} underlineColor='#181c3f' theme={{ colors: { placeholder: '#636bad', text: '#181c3f', primary: '#636bad', background: 'transparent' } }} style={{ marginTop: 7, marginBottom: 7, color: 'red', height: 60 }} label='Name' mode='flat' />


                    <TextInput onChangeText={setEmail} left={<TextInput.Icon name="email" color='#181c3f' size={22} />} underlineColor='#181c3f' theme={{ colors: { placeholder: '#636bad', text: '#181c3f', primary: '#636bad', background: 'transparent' } }} style={{ marginTop: 7, marginBottom: 7, color: 'red', height: 60 }} label='Email' mode='flat' />


                    <TextInput onChangeText={setPass} secureTextEntry={showpass === true ? false : true} left={<TextInput.Icon name="lock" color='#181c3f' size={22} />} right={<TextInput.Icon onPress={() => { setShowPass(!showpass) }} name="eye" color='#181c3f' size={22} style={{ paddingTop: 5 }} />} underlineColor='#181c3f' theme={{ colors: { placeholder: '#636bad', text: '#181c3f', primary: '#636bad', background: 'transparent' } }} style={{ marginTop: 7, color: 'red', height: 60 }} label='Password' mode='flat' />

                </View>

                <View style={{ justifyContent: "center", display: 'flex', flexDirection: 'row' }}>
                    <IconButton
                        icon={() => (<Anticon onPress={handleNext} name={'login'} size={50} color={'#181c3f'} />)}
                        size={50}
                    />

                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ color: '#181c3f', textAlign: 'center', fontSize: 15 }} > Already have an Account? <Text onPress={() => { navigation.navigate('Signin') }} style={{ fontStyle: 'italic', fontWeight: 'bold', color: '#636bad', textDecorationLine: 'underline' }}> Login Here </Text> </Text>
                </View>

            </View>

        </ScrollView>
    );
}
