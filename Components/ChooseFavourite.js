import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import Anticon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { IconButton, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { Button } from 'react-native-paper';
import MaterialComm from 'react-native-vector-icons/MaterialCommunityIcons'
import FavouriteBox from './FavouriteBox';
import auth from '@react-native-firebase/auth'

const ChooseFavourite = ({ navigation, route }) => {
    const { email, name, pass } = route.params;
    const [imageShow, setImageShow] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [favourite, setFavourite] = useState('')
    const selectFavourite = (fav) => {
        setFavourite(fav)
    }
    const openCamera = async () => {
        await ImageCropPicker.openPicker({
            width: 1200,
            height: 1080,
            cropping: true
        }).then(immage => {
            const imaeUri = Platform.OS === 'ios' ? immage.sourceURL : immage.path;
            setImageShow(imaeUri);
            console.log(imaeUri)

        });
    }

    const uploadImage = async () => {
        console.log('Inside Uplaod IMage')

        let filename = imageShow.substring(imageShow.lastIndexOf('/') + 1)

        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.')

        filename = name + Date.now() + '.' + extension
        try {

            const StorageRef = storage().ref(`profile/${filename}`)


            await StorageRef.putFile(imageShow)

            const url = await StorageRef.getDownloadURL()
            setImageShow('')

            return url

        } catch (error) {
            console.log(error)

            setImageShow('')
            return null
        }

    }

    const HandleSignup = async () => {
        if (imageShow === '' || favourite === '') {
            if (imageShow === '') {
                Alert.alert('Warning', 'Please Select Profile Image')
            }
            else {
                Alert.alert('Warning', 'Please select one genre')
            }
        } else {
            // auth().createUserWithEmailAndPassword('talha@gmail.com', '123456').then(()=>{
            //     Alert.alert("Created");

            // }).catch((err)=>{
            //     console.log(err)
            // })
            
            setIsLoading(true);
            const uri = await uploadImage();
            const response = await fetch(`http://192.168.100.122:5000/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name, email: email, password: pass, image: uri, favourite: favourite })
            });


            const json = await response.json();
            console.log(json.name);
            if (json.success) {
                //SAVE THE AUTH TOKEN AND REDIRECT
                await AsyncStorage.setItem('token', json.token);
                await AsyncStorage.setItem('name', json.name);
                await AsyncStorage.setItem('email', json.email);
                await AsyncStorage.setItem('image', json.image);
                await AsyncStorage.setItem('favourite', json.favourite);
                setIsLoading(false)
                Alert.alert('Success', 'Account Created Successfully')
                navigation.navigate('Home')
            } else {
                Alert.alert('Failed', "Invalid Credintials");
                setIsLoading(false)
            }
        }
    }
    return (
        <>
            <View style={{ display: 'flex', justifyContent: 'space-between', flex: 1, height: Dimensions.get('window').height }}>
                <ScrollView>
                    <View style={{ padding: 30, paddingTop: 10 }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: "black" }}>
                            Select Image
                        </Text>

                        <View style={{ marginVertical: 10 }} >
                            {imageShow === '' ? <TouchableOpacity onPress={openCamera} style={{ alignItems: "center", borderWidth: 1, borderStyle: 'dashed', padding: 15 }}>
                                <View style={{ display: 'flex', gap: 5, alignItems: "center" }}>
                                    <MaterialIcon name={'add-a-photo'} size={20} color={'#181c3f'} />
                                    <Text>Click to Choose image</Text>
                                </View>
                            </TouchableOpacity> : <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <IconButton
                                    icon={() => (<MaterialIcon onPress={openCamera} name={'check-circle'} size={20} color={'#181c3f'} />)}
                                    size={50}
                                />
                                <Text>Image Selected</Text>
                            </View>}
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 30 }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: "black" }}>
                            Choose Favourite Genres
                        </Text>
                        <View style={{ display: 'flex', flexDirection: 'column', paddingVertical: 10, gap: 15 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, }}>
                                <FavouriteBox Icon={MaterialIcon} iconname='music-video' heading='Blues' color='black' selectFavourite={selectFavourite} />
                                <FavouriteBox Icon={MaterialComm} iconname='music' heading='Classical' color='black' selectFavourite={selectFavourite} />
                                <FavouriteBox Icon={MaterialComm} iconname='music-clef-treble' heading='Country' color='black' selectFavourite={selectFavourite} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, }}>
                                <FavouriteBox Icon={MaterialComm} iconname='string-lights' heading='Disco' color='black' selectFavourite={selectFavourite} />
                                <FavouriteBox Icon={MaterialComm} iconname='music-clef-alto' heading='Hiphop' color='black' selectFavourite={selectFavourite} />
                                <FavouriteBox Icon={MaterialComm} iconname='music-note-quarter-dotted' heading='Jazz' color='black' selectFavourite={selectFavourite} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, }}>
                                <FavouriteBox Icon={MaterialComm} iconname='music-circle-outline' heading='Metal' color='black' selectFavourite={selectFavourite} />
                                <FavouriteBox Icon={MaterialComm} iconname='file-music' heading='Pop' color='black' selectFavourite={selectFavourite} />
                                <FavouriteBox Icon={MaterialComm} iconname='music-accidental-sharp' heading='Raggae' color='black' selectFavourite={selectFavourite} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, }}>
                                <FavouriteBox Icon={MaterialComm} iconname='book-music' heading='Rock' color='black' selectFavourite={selectFavourite} />

                            </View>
                        </View>
                    </View>

                </ScrollView>
                <View style={{ padding: 40, backgroundColor: '#181c3f', borderTopRightRadius: 30, borderTopLeftRadius: 30, alignItems: 'center' }}>
                    <Text style={{ color: 'white', paddingBottom: 15, fontSize: 16 }}>Click Here to Create Your Account</Text>
                    {isLoading ? <ActivityIndicator size={'large'} color={'white'} /> : <TouchableOpacity onPress={HandleSignup}>
                        <Button labelStyle={{ fontWeight: 'bold' }} color={'white'} style={{ width: 125 }} icon="login" mode="contained">
                            Register
                        </Button>
                    </TouchableOpacity>}
                </View>
            </View>
        </>
    )
}

export default ChooseFavourite