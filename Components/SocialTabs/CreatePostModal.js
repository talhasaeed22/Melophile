import { View, Text, Modal, TouchableOpacity, TextInput, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Ant from 'react-native-vector-icons/AntDesign'
import colors from '../misc/colors'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { ActivityIndicator, Button } from 'react-native-paper'
import Fontsito from 'react-native-vector-icons/Fontisto'
import ImagePicker from 'react-native-image-crop-picker'
import DocumentPicker from 'react-native-document-picker'
const CreatePostModal = ({ visible, onClose, onSubmit, loading }) => {
    const [content, setContent] = useState('')
    const [sound, setSound] = useState('')
    const [image, setImage] = useState('')

    const handleImage = () => {
        ImagePicker.openPicker({
            cropping: true
        }).then(image => {
            const imaeUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imaeUri);
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSound = async () => {
        let result = await DocumentPicker.pick();
        setSound(result);
    }
    return (
        <Modal
            visible={visible}
            animationType='fade'
            transparent
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.inputContainer}>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", gap: 90 }}>
                        <Text style={{ color: '#181c3f', fontSize: 20, marginVertical: 30, fontWeight: 'bold' }}>Create New Post</Text>
                        <TouchableOpacity onPress={onClose}>
                            <MaterialIcon name={'close'} size={25} color={'#181c3f'} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ display: 'flex', gap: 10 }}>

                        <TextInput multiline numberOfLines={5} placeholder="What's on your mind....." value={content} onChangeText={setContent} style={styles.input} />
                        <TouchableOpacity onPress={handleImage} style={{ alignItems: "center", borderWidth: 1, borderStyle: 'dashed', padding: 15, width: Dimensions.get('window').width - 100, borderColor: image !== '' && '#50C878' }}>
                            <View style={{ display: 'flex', gap: 5, alignItems: "center" }}>
                                {image === '' ? <MaterialIcon name={'add-a-photo'} size={25} color={'#181c3f'} /> : <MaterialIcon name='check-circle' size={25} color='#50C878' />}

                                <Text>{image !== '' ? 'Image Selected' : 'Click to choose image'}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleSound} style={{ alignItems: "center", borderWidth: 1, borderStyle: 'dashed', padding: 15, width: Dimensions.get('window').width - 100, borderColor: sound !== '' && '#50C878' }}>
                            <View style={{ display: 'flex', gap: 5, alignItems: "center" }}>
                                {sound === '' ? <Fontsito name={'applemusic'} size={25} color={'#181c3f'} /> : <MaterialIcon name='check-circle' size={25} color='#50C878' />}

                                <Text>{sound !== '' ? 'Sound Selected' : 'Click to choose audio'}</Text>
                            </View>
                        </TouchableOpacity>

                        {loading ? <ActivityIndicator style={{ marginVertical: 10 }} color="#181c3f" /> : <TouchableOpacity onPress={() => { onSubmit(image, content, sound) }}>

                            <Button icon={'plus'} buttonColor='#181c3f' textColor='white' style={{ borderRadius: 10, marginTop: 20, width: "45%", alignSelf: 'center' }}>Create Post</Button>
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={[StyleSheet.absoluteFillObject, styles.modalBG]}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    inputContainer: {
        width: Dimensions.get('window').width - 20,
        // height: 200,
        paddingBottom: 40,
        borderRadius: 10,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgray',
        width: Dimensions.get('window').width - 100,
        borderRadius: 10,
        padding: 10,
        // height: 100
        // height:250
    },
    submit: {
        padding: 10,
        backgroundColor: '#181c3f',
        borderRadius: 50,
        marginTop: 15
    },
    modalBG: {
        backgroundColor: colors.MODAL_BG,
        zIndex: -1
    }

})

export default CreatePostModal