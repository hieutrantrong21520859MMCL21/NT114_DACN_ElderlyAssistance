import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function AddMedicineScreen({ navigation }) {
  const route = useRoute();
  const editingMedicine = route.params?.editingMedicine;
  const timeOfDay = route.params?.timeOfDay || 'Morning';
  const selectedDate = route.params?.selectedDate || new Date().toDateString();

  // Set default values when editing a medicine
  const [name, setName] = useState(editingMedicine ? editingMedicine.name.split(' (')[0] : '');
  const [type, setType] = useState(editingMedicine ? editingMedicine.dosage.split(' ')[1] : '');
  const [dose, setDose] = useState(editingMedicine ? editingMedicine.name.match(/\(([^)]+)\)/)?.[1] || '' : '');
  const [amount, setAmount] = useState(editingMedicine ? editingMedicine.dosage.split(' ')[0] : '');

  const handleSave = () => {
    const updatedMedicine = {
      id: editingMedicine ? editingMedicine.id : Date.now().toString(),
      name: `${name} (${dose})`,
      dosage: `${amount} ${type}`,
      timeOfDay: timeOfDay,
      date: selectedDate, // Use selectedDate instead of the current date
    };

    navigation.navigate('ScheduleMedicine', { newMedicine: updatedMedicine, editing: !!editingMedicine });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Medicine</Text>
      <Text style={styles.subtitle}>Fill out the fields and hit the Save Button to add it!</Text>

      <Text style={styles.label}>Name*</Text>
      <TextInput
        placeholder="Vitamin D"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Type*</Text>
      <TextInput
        placeholder="Capsule"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />

      <Text style={styles.label}>Dose*</Text>
      <TextInput
        placeholder="1000mg"
        value={dose}
        onChangeText={setDose}
        style={styles.input}
      />

      <Text style={styles.label}>Amount*</Text>
      <TextInput
        placeholder="1"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D8CF8',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
    marginBottom: 10,
  },
  saveButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1D8CF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
