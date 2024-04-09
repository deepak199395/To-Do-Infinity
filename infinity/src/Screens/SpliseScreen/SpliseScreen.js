import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import logo from "../../Assets/logo1.jpeg"

const SpliseScreen = ({navigation}) => {

setTimeout(()=>{
navigation.replace('Home')
},5000)

  return (
    <View style={{flex:1,alignContent:"center",justifyContent:"center",backgroundColor:"white"}}>
    <TouchableOpacity>
    <Image source={logo} style={styles.img}/>
    <Text style={styles.txt}>WELCOME TO </Text>
    <Text style={styles.txt}>INFINITY</Text>
    </TouchableOpacity>
    </View>
  )
}

export default SpliseScreen

const styles = StyleSheet.create({
  img:{
    width:"80%",
    height:"60%",
    alignSelf:"center",
    justifyContent:"center"
  },
  txt:{
    alignItems:"center",
    alignSelf:"center",
    marginTop:20,
    fontWeight:"bold",
    fontSize:35,
    color:"black"
  }
})