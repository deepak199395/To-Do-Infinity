import { StyleSheet, Text, View,ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const Fitness = () => {
        const navigation = useNavigation();
        const handleChange = (screenName) => {
            navigation.navigate(screenName);
        }
  return (
    <View style={styles.container}>
              <ScrollView>
               <View style={styles.body}>
               <TouchableOpacity style={[styles.option, { backgroundColor: '#FF6F61' }]} onPress={() => handleChange('intermittentFasting')}>
                       <Text style={styles.optionText}>🗞 Fitness</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[styles.option, { backgroundColor: '#FF6F61' }]} onPress={() => handleChange('ToDoList')}>
                       <Text style={styles.optionText}>📋 GYM</Text>
                   </TouchableOpacity>
               </View>
               </ScrollView>
           </View>
  )
}
export default Fitness
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
        elevation: 4,
    },
    optionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
})