﻿import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddMedicineScreen({ navigation }) {
  const route = useRoute();
  const editingMedicine = route.params?.editingMedicine;
  const timeOfDay = route.params?.timeOfDay; // Nhận timeOfDay từ navigation params
  const selectedDate = route.params?.selectedDate || new Date().toDateString();

  const [name, setName] = useState(editingMedicine ? editingMedicine.name.split(' (')[0] : '');
  const [type, setType] = useState(editingMedicine ? editingMedicine.dosage.split(' ')[1] : '');
  const [color, setColor] = useState(editingMedicine ? editingMedicine.name.match(/\(([^)]+)\)/)?.[1] || '' : '');
  const [amount, setAmount] = useState(editingMedicine ? editingMedicine.dosage.split(' ')[0] : '');
  const [time, setTime] = useState(editingMedicine ? new Date(editingMedicine.time) : new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handleSave = () => {
    if (!name || !type || !color || !amount) {
      Alert.alert('Validation Error', 'All fields must be filled before saving!');
      return;
    }

    const updatedMedicine = {
      id: editingMedicine ? editingMedicine.id : Date.now().toString(),
      name: `${name} (${color})`,
      dosage: `${amount} ${type}`,
      timeOfDay, // Lưu timeOfDay được truyền từ màn hình trước
      date: selectedDate,
      time: time.toISOString(),
    };

    // Điều hướng trở lại màn hình ScheduleMedicine
    navigation.navigate('ScheduleMedicine', { newMedicine: updatedMedicine, editing: !!editingMedicine });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D8CF8" />
        </TouchableOpacity>
        <Text style={styles.title}>Add New Medicine</Text>
      </View>

      <Text style={styles.subtitle}>Fill out the fields and hit the Save Button to add it!</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="medkit-outline" size={24} color="#1D8CF8" style={styles.icon} />
        <TextInput placeholder="Vitamin D" value={name} onChangeText={setName} style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="flask-outline" size={24} color="#1D8CF8" style={styles.icon} />
        <TextInput placeholder="Capsule" value={type} onChangeText={setType} style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="color-palette-outline" size={24} color="#1D8CF8" style={styles.icon} />
        <TextInput placeholder="Gold" value={color} onChangeText={setColor} style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="calculator-outline" size={24} color="#1D8CF8" style={styles.icon} />
        <TextInput placeholder="1" value={amount} onChangeText={setAmount} style={styles.input} />
      </View>

      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.inputContainer}>
        <Ionicons name="time-outline" size={24} color="#1D8CF8" style={styles.icon} />
        <Text style={styles.timeText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker value={time} mode="time" is24Hour={true} display="default" onChange={handleTimeChange} />
      )}

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Ionicons name="save-outline" size={24} color="#FFF" />
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D8CF8',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1D8CF8',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  timeText: { 
    fontSize: 16, 
    color: '#333' 
  },
});