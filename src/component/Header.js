import React from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet } from 'react-native';

const Header=()=>{

    return(
<View style={styles.container}>
    <Text style={styles.header}>MukeSoft Demo</Text>
</View>
    )
}

const styles=StyleSheet.create({
 container:{
     flexDirection:'column',
     backgroundColor:'red',
     justifyContent:'center',
     marginTop:50,
     width:'100%',
     backgroundColor:'white',
     borderBottomWidth:1,
     borderBottomColor:'grey'
 },
 header:{
     fontSize:20,
     margin:10,
     textAlign:'center'
 }
})

export default Header;