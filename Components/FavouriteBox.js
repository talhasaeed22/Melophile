import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const FavouriteBox = ({iconname, heading, Icon, color, selectFavourite}) => {
    const [selected, setSelected] = useState(false)
    const handleSelected = ()=>{
        setSelected(!selected);
        if(!selected){
            selectFavourite(heading)
        }else{
            selectFavourite('')
        }
    }
  return (
    <TouchableOpacity onPress={handleSelected} style={[{display:'flex', paddingHorizontal:15, paddingVertical:10, alignItems:'center', }, selected && {borderWidth:1, borderStyle:'dashed', borderColor:'green'}]}>
        <View>
            <Icon name={iconname} size={30} color={!selected ? color : 'green'} />
        </View>
        <Text>
            {heading}
        </Text>
    </TouchableOpacity>
  )
}

export default FavouriteBox