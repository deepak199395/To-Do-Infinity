import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Animated,
    Easing,
  } from 'react-native'
  import React, { useEffect, useRef, useState } from 'react'
  import { useNavigation } from '@react-navigation/native'
  
  const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation()
  
    const fadeAnim = useRef(new Animated.Value(0)).current
  
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start()
    }, [])
  
    const handleClickOnRegistrations=()=>{
        navigation.navigate("Regi")
    }
    const handlePress = async () => {
      try {
        const response = await fetch("https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/auth/Login-User/api3", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })
  
        const result = await response.json()
  
        if (response.ok) {
          navigation.navigate("intermittentFasting")
        } else {
          alert("Login failed: " + (result.message || "Invalid credentials"))
        }
      } catch (error) {
        console.log(error, "error in API")
        alert("An error occurred while logging in.")
      }
    }
  
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to IBM</Text>
  
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />
        <TouchableOpacity
          style={[
            styles.button,
            email && password ? styles.buttonActive : null
          ]}
          onPress={handlePress}
          activeOpacity={0.8}
          disabled={!email || !password}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClickOnRegistrations}>
            <Text style={styles.regi}>Yet not Register</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
  
  export default Auth
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'linear-gradient(45deg, #d8f3dc, #b7e4c7, #95d5b2)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      backgroundColor: '#f0f4f8',
    },
    logo: {
      width: 140,
      height: 60,
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: '#0f62fe',
      marginBottom: 30,
    },
    input: {
      width: '100%',
      height: 55,
      borderWidth: 1,
      borderColor: '#d1d9e6',
      borderRadius: 12,
      paddingHorizontal: 15,
      backgroundColor: '#ffffff',
      fontSize: 16,
      marginBottom: 16,
      shadowColor: '#0f62fe',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 3,
    },
    button: {
      width: '100%',
      height: 55,
      backgroundColor: '#a6c8ff',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      shadowColor: '#0f62fe',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 4,
    },
    buttonActive: {
      backgroundColor: '#0f62fe',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    regi:{
        marginTop:10,
        fontSize:15,
        marginLeft:190
    }
  })
  