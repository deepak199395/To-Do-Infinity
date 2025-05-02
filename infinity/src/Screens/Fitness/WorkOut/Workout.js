import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const Workout = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>🏋️‍♂️ CHEST DAY</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>💪 SHOULDER DAY</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>🦾 BICEPS DAY</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>🙌 TRICEPS DAY</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>🏃‍♂️ BACK BODY DAY</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Workout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#0984e3',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
