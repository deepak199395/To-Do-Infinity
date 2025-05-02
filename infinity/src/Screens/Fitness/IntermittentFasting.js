import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Workout from './WorkOut/Workout';
import { useNavigation } from '@react-navigation/native'

const IntermittentFasting = () => {
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [amPm, setAmPm] = useState('AM');
  const [fastingHours, setFastingHours] = useState(16);
  const [nextEatingDateTime, setNextEatingDateTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState('');
  const [waterCount, setWaterCount] = useState(0);
  const [tip, setTip] = useState('');
  const [isFasting, setIsFasting] = useState(false);

  const navigation = useNavigation()

  const tips = [
    'Avoid sugary drinks and stick to water during fasting.',
    'Try light exercise like walking during fasts.',
    'Get enough sleep to support fat burning and recovery.',
    'Stay consistent with your eating window.',
    'Drink water when you feel hungry to curb appetite.',
  ];

  useEffect(() => {
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  useEffect(() => {
    let interval;
    if (nextEatingDateTime) {
      interval = setInterval(() => {
        const now = new Date();
        const difference = nextEatingDateTime - now;

        if (difference <= 0) {
          clearInterval(interval);
          setRemainingTime('Time to eat!');
          setIsFasting(false);
          AsyncStorage.removeItem('fastingData');
        } else {
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / (1000 * 60)) % 60);
          const seconds = Math.floor((difference / 1000) % 60);

          setRemainingTime(
            `${hours.toString().padStart(2, '0')}:${minutes
              .toString()
              .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
          );
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [nextEatingDateTime]);
const handleWorkout=()=>{
  navigation.navigate("Workout")
}

  // Load saved fasting data
  useEffect(() => {
    const loadFastingData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('fastingData');
        if (storedData) {
          const parsed = JSON.parse(storedData);
          const nextTime = new Date(parsed.nextEatingDateTime);
          if (parsed.isFasting && nextTime > new Date()) {
            setNextEatingDateTime(nextTime);
            setIsFasting(true);
          } else {
            await AsyncStorage.removeItem('fastingData');
          }
        }
      } catch (error) {
        console.log('Failed to load fasting data', error);
      }
    };

    loadFastingData();
  }, []);

  const calculateNextEatingTime = async () => {
    try {
      let selectedHour = parseInt(hour);
      let selectedMinute = parseInt(minute);

      if (amPm === 'PM' && selectedHour !== 12) {
        selectedHour += 12;
      }
      if (amPm === 'AM' && selectedHour === 12) {
        selectedHour = 0;
      }

      const now = new Date();
      now.setHours(selectedHour, selectedMinute, 0, 0);

      const nextTime = new Date(now.getTime() + fastingHours * 60 * 60 * 1000);
      setNextEatingDateTime(nextTime);
      setIsFasting(true);

      // Save to AsyncStorage
      await AsyncStorage.setItem(
        'fastingData',
        JSON.stringify({
          nextEatingDateTime: nextTime.toISOString(),
          isFasting: true,
        })
      );
    } catch (error) {
      setRemainingTime('Invalid time selected.');
    }
  };

  const stopFasting = async () => {
    setIsFasting(false);
    setNextEatingDateTime(null);
    setRemainingTime('');
    await AsyncStorage.removeItem('fastingData');
  };

  const renderNumbers = (max) =>
    Array.from({ length: max }, (_, i) => (i < 10 ? '0' + i : '' + i));

  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <Text style={styles.header}>🥗 Intermittent Fasting Timer</Text>

      <View style={styles.pickerGroup}>
        <Text style={styles.label}>Select Start Time</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={hour}
            style={styles.picker}
            onValueChange={(itemValue) => setHour(itemValue)}
          >
            {renderNumbers(12).map((h, index) => (
              <Picker.Item
                label={h === '00' ? '12' : h}
                value={h === '00' ? '12' : h}
                key={index}
              />
            ))}
          </Picker>

          <Picker
            selectedValue={minute}
            style={styles.picker}
            onValueChange={(itemValue) => setMinute(itemValue)}
          >
            {renderNumbers(60).map((m, index) => (
              <Picker.Item label={m} value={m} key={index} />
            ))}
          </Picker>

          <Picker
            selectedValue={amPm}
            style={styles.picker}
            onValueChange={(itemValue) => setAmPm(itemValue)}
          >
            <Picker.Item label="AM" value="AM" />
            <Picker.Item label="PM" value="PM" />
          </Picker>
        </View>

        <Text style={styles.label}>Select Fasting Schedule</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={fastingHours}
            style={styles.picker}
            onValueChange={(itemValue) => setFastingHours(itemValue)}
          >
            <Picker.Item label="12:8 (12 hrs fast)" value={12} />
            <Picker.Item label="16:8 (16 hrs fast)" value={16} />
            <Picker.Item label="18:6 (18 hrs fast)" value={18} />
            <Picker.Item label="20:4 (20 hrs fast)" value={20} />
            <Picker.Item label="OMAD (23 hrs fast)" value={23} />
          </Picker>
        </View>
      </View>

      {!isFasting ? (
        <Button title="Start Fasting" onPress={calculateNextEatingTime} />
      ) : (
        <Button title="Stop Fasting" color="#d63031" onPress={stopFasting} />
      )}

      {remainingTime !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {remainingTime === 'Time to eat!'
              ? '⏰ Time to eat!'
              : `⏳ Time remaining: ${remainingTime}`}
          </Text>
        </View>
      )}

      <View style={styles.waterContainer}>
        <Text style={styles.sectionTitle}>💧 Water Intake</Text>
        <Text style={styles.waterText}>{waterCount} Glasses</Text>
        <Button title="Add Glass" onPress={() => setWaterCount(waterCount + 1)} />
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.sectionTitle}>🔥 Fat Loss Tip</Text>
        <Text style={styles.tipText}>{tip}</Text>
      </View>
      <Button title="Work-out"  onPress={handleWorkout} />

    </ScrollView>
  );
};

export default IntermittentFasting;

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2d3436',
  },
  pickerGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginVertical: 8,
    fontWeight: '600',
    color: '#636e72',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    color: '#2d3436',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#dfe6e9',
    borderRadius: 12,
    width: '100%',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#0984e3',
  },
  waterContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#dff9fb',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  waterText: {
    fontSize: 18,
    marginVertical: 10,
  },
  tipsContainer: {
    marginTop: 20,
    backgroundColor: '#ffeaa7',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  tipText: {
    fontSize: 16,
    color: '#2d3436',
  },
  Workoutcontainer:{
    borderColor:"black",
    marginTop:50,
    borderWidth:1

  },
  workouttxt:{
    height:20,
    textAlign:"center",
    width:80,
    marginTop:20
  }
});
