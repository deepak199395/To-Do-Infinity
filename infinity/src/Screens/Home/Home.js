import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from "../../Assets/logo1.jpeg";
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    const handleChange = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <View style={styles.container}>
           
            <ScrollView>
            <View style={styles.body}>
                <TouchableOpacity style={[styles.option, { backgroundColor: '#FF6F61' }]} onPress={() => handleChange('ToDoList')}>
                    <Text style={styles.optionText}>📋 To-Do List</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.option, { backgroundColor: '#6A0572' }]} onPress={() => handleChange('Note')}>
                    <Text style={styles.optionText}>📌 Note</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.option, { backgroundColor: '#118AB2' }]} onPress={() => handleChange('Documents')}>
                    <Text style={styles.optionText}>🗄 Documents</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.option, { backgroundColor: '#073B4C' }]} onPress={() => handleChange('Reminders')}>
                    <Text style={styles.optionText}>🗂 Reminders</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.option, { backgroundColor: '#00A896' }]} onPress={() => handleChange('Events')}>
                    <Text style={styles.optionText}>🗓 Events</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.option, { backgroundColor: '#FFD166' }]} onPress={() => handleChange('Calculators')}>
                    <Text style={styles.optionText}>📱 Calculators</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.option, { backgroundColor: '#6A0572' }]} onPress={() => handleChange('Calendar')}>
                    <Text style={styles.optionText}>📆 Calendar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.option, { backgroundColor: '#118AB2' }]} onPress={() => handleChange('EMI')}>
                    <Text style={styles.optionText}>💳 EMI's</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.option, { backgroundColor: '#FF6F61' }]} onPress={() => handleChange('Bills')}>
                    <Text style={styles.optionText}>🗞 Bills</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8', // Light gray background
    },
    header: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // White background
        borderBottomWidth: 1,
        borderBottomColor: '#ccc', // Light gray border
        marginBottom: 10,
    },
    logo: {
        width: 50,
        height: 50,
    },
    body: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    option: {
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: '45%',
        elevation: 4, // Android shadow
    },
    optionText: {
        fontSize: 18,
        fontWeight: '600', // Semi-bold
        color: '#fff', // White text color
    },
});
