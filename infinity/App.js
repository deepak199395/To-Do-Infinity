import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ToDoList from './src/Screens/TodoList/ToDoList';
import Home from './src/Screens/Home/Home';
import SpliseScreen from './src/Screens/SpliseScreen/SpliseScreen';

const App = () => {
  const Stack=createNativeStackNavigator()

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='SpliseScreen' >
    <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
    <Stack.Screen name='SpliseScreen' component={SpliseScreen} options={{headerShown:false}}/>

    <Stack.Screen name='ToDoList' component={ToDoList}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})