import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ToDoList from './src/Screens/TodoList/ToDoList';
import Home from './src/Screens/Home/Home';
import SpliseScreen from './src/Screens/SpliseScreen/SpliseScreen';
import Fitness from './src/Screens/Fitness/Fitness';
import intermittent_fasting from './src/Screens/Fitness/IntermittentFasting';
import IntermittentFasting from './src/Screens/Fitness/IntermittentFasting';
import Auth from './src/Screens/Auth/Auth';
import Regi from './src/Screens/Auth/Regi';
import Chestday from './src/Screens/Fitness/WorkOut/Chestday';
import Bisebs from './src/Screens/Fitness/WorkOut/Bisebs';
import Back from './src/Screens/Fitness/WorkOut/Back';
import Soldir from './src/Screens/Fitness/WorkOut/Soldir';
import Workout from './src/Screens/Fitness/WorkOut/Workout';

const App = () => {
  const Stack=createNativeStackNavigator()
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='SpliseScreen' >
    <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
    <Stack.Screen name='SpliseScreen' component={SpliseScreen} options={{headerShown:false}}/>
    <Stack.Screen name='ToDoList' component={ToDoList}/>
    <Stack.Screen name='Fitness' component={Fitness}/>
    <Stack.Screen name='intermittentFasting' component={IntermittentFasting} options={{headerShown:false}}/>
    <Stack.Screen name='Auth' component={Auth} options={{headerShown:false}}/>
    <Stack.Screen name='Regi' component={Regi} options={{headerShown:false}}/>
    <Stack.Screen name='Chestday' component={Chestday}/>
    <Stack.Screen name='Bisebs' component={Bisebs}/>
    <Stack.Screen name='Back' component={Back}/>
    <Stack.Screen name='Soldir' component={Soldir}/>
    <Stack.Screen name='Workout' component={Workout}/>

   
   </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
const styles = StyleSheet.create({})