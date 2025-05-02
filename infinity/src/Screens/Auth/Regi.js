import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    Animated,
    Easing,
    ScrollView,
    Image,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import backicon from "../../Assets/arrowback.png"
const Regi = () => {
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")

    const fadeAnim = useRef(new Animated.Value(0)).current
    const navigation = useNavigation()

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1200,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start()
    }, [])

    const HandleRegi = async () => {
        if (!name || !lastname || !email || !password || !phone) {
            Alert.alert("Please fill all fields.")
            return
        }

        try {
            const response = await fetch(
                "https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/auth/Create-User/api1",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, lastname, email, password, phone }),
                }
            )
            const result = await response.json()

            if (response.ok) {
                navigation.navigate("Auth")
            } else {
                Alert.alert("Registration Failed", result.message || "Try again later.")
            }
        } catch (error) {
            console.log("Registration Error:", error)
            Alert.alert("Error", "Something went wrong.")
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f7fa',
 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowIcon}>
                    <Image source={backicon} style={styles.arrowicom} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#007ACC', marginLeft: 10,backgroundColor: '#e0f7fa',
 }}>
                    Register
                </Text>
            </View>
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                <Text style={styles.heading}>Create Your Account</Text>

                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastname}
                    onChangeText={setLastname}
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholderTextColor="#aaa"
                />
                <TouchableOpacity style={styles.button} onPress={HandleRegi}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </Animated.View>
        </ScrollView>
    )
}

export default Regi

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0f7fa',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#00796b',
    },
    input: {
        width: '100%',
        height: 55,
        borderColor: '#80cbc4',
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 16,
        shadowColor: '#00796b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    button: {
        width: '100%',
        height: 55,
        backgroundColor: '#00796b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 10,
        shadowColor: '#004d40',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    arrowIcon: {
        padding: 10,
        marginLeft: 10,
        backgroundColor: '#e0f7fa',

    },

    arrowicom: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        backgroundColor: '#e0f7fa',

    },

})
