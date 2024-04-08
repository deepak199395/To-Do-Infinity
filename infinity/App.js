import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import logo from "../infinity/src/Assets/logo1.jpeg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getTodos = async () => {
    const todos = await AsyncStorage.getItem("todo")
    console.log(todos);
    setTodo(JSON.parse(todos) ? JSON.parse(todos) : [])
  }
  useEffect(() => {
    getTodos()
  }, [])

  const clear = () => setNewTodo(initialState);
  const initialState = {
    id: 0,
    title: "",
    Description: "",
    completed: false,
  };
  const [todo, setTodo] = useState([])
  const [newTodo, setNewTodo] = useState(initialState)

  const addTodo = () => {
    if (!newTodo.title || !newTodo.Description) {
      Alert.alert('Please Enter all the details');
      return;
    }
    newTodo.id = todo.length + 1
    const updatedTodo = [newTodo, ...todo]
    setTodo(updatedTodo);
    AsyncStorage.setItem("todo", JSON.stringify(updatedTodo))
    clear()
    setIsModalVisible(false)
  }

  const updateTodo = (item) => {
    const updatedTodo = todo.map(todoItem => {
      if (todoItem.id === item.id) {
        return { ...todoItem, completed: !todoItem.completed }
      }
      return todoItem;
    });

    setTodo(updatedTodo);
    AsyncStorage.setItem('todo', JSON.stringify(updatedTodo));
  };

  const clearCompleted = () => {
    const updatedTodo = todo.filter(todoItem => !todoItem.completed);
    setTodo(updatedTodo);
    AsyncStorage.setItem('todo', JSON.stringify(updatedTodo));
  };

  const displayTodo = (item) => (
    <TouchableOpacity
      key={item.id}
      style={{ display: "flex", flexDirection: "row", marginTop: 10, borderBottomWidth: 1 }}
      onPress={() =>
        Alert.alert(`${item.title}`, `${item.Description}`, [
          {
            text: item.completed ? 'Mark in progress' : "Mark completed",
            onPress: () => updateTodo(item),
          },
          {
            text: 'Ok',
            style: 'cancel'
          }
        ])
      }
    >
      <BouncyCheckbox isChecked={item.completed} fillColor='blue' onPress={() => updateTodo(item)} />
      <Text style={{ width: "90%", fontSize: 16, textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleChange = (title, value) => setNewTodo({ ...newTodo, [title]: value });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.heading}>Hello, Deepak!</Text>
        <Text style={styles.taskCount}>{todo.length} {todo.length === 1 ? 'task' : 'tasks'}</Text>
      </View>
      <View style={styles.tasksContainer}>
        <Text style={styles.sectionTitle}>TODO 🗒️</Text>
        <ScrollView style={styles.taskList}>
          {todo.map(item => !item.completed && displayTodo(item))}
        </ScrollView>
        <Text style={styles.completedText}>Completed ✅</Text>
        <ScrollView style={styles.taskList}>
          {todo.map(item => item.completed && displayTodo(item))}
        </ScrollView>
        <TouchableOpacity style={styles.clearButton} onPress={clearCompleted}>
          <Text style={styles.clearButtonText}>Clear Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.plusButton}>+</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} animationType='slide' onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Task</Text>
          <TextInput
            style={styles.input}
            placeholder='Title'
            value={newTodo.title}
            onChangeText={(title) => handleChange('title', title)}
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            multiline
            placeholder='Description'
            value={newTodo.Description}
            onChangeText={(Description) => handleChange('Description', Description)}
          />
          <TouchableOpacity onPress={addTodo} style={styles.addButton}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#4CAF50', // Green color
  },
  logo: {
    width: 40,
    height: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  taskCount: {
    fontSize: 16,
    color: '#FFF',
  },
  tasksContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  taskList: {
    marginTop: 20,
  },
  completedText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50', // Green color
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  plusButton: {
    fontSize: 30,
    color: '#FFF',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  descriptionInput: {
    height: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  clearButton: {
    backgroundColor: 'red', // Red color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
    marginRight:100

  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
