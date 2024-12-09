import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScheduleMedicineScreen() {
  const [medicines, setMedicines] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  console.log(route.params);

  useEffect(() => {
    // Load saved medicines from AsyncStorage
    const loadMedicines = async () => {
      try {
        const storedMedicines = await AsyncStorage.getItem('medicines');
        if (storedMedicines) {
          setMedicines(JSON.parse(storedMedicines));
        }
      } catch (error) {
        console.error('Failed to load medicines:', error);
      }
    };
    loadMedicines();
  }, []);

  useEffect(() => {
    // Save medicines to AsyncStorage when medicines state changes
    const saveMedicines = async () => {
      try {
        await AsyncStorage.setItem('medicines', JSON.stringify(medicines));
      } catch (error) {
        console.error('Failed to save medicines:', error);
      }
    };
    saveMedicines();
  }, [medicines]);

  useEffect(() => {
    if (route.params?.newMedicine) {
      const { newMedicine } = route.params;
      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');

      if (route.params?.editing) {
        updateMedicine(newMedicine, selectedDateStr);
      } else {
        addNewMedicine(newMedicine, selectedDateStr);
      }
    }
    if (route.params?.editingMedicine) {
      setEditingMedicine(route.params.editingMedicine);
    }
  }, [route.params]);

  const addNewMedicine = (newMedicine, selectedDateStr) => {
    setMedicines((prevMedicines) => ({
      ...prevMedicines,
      [selectedDateStr]: {
        ...prevMedicines[selectedDateStr],
        [newMedicine.timeOfDay]: [
          ...(prevMedicines[selectedDateStr]?.[newMedicine.timeOfDay] || []),
          newMedicine,
        ],
      },
    }));
    console.log(
      `Added new medicine: ${newMedicine.name}, Dosage: ${
        newMedicine.dosage
      }, Time: ${new Date(
        newMedicine.time
      ).toLocaleTimeString()} on ${selectedDateStr}`
    );
  };

  const updateMedicine = (updatedMedicine, selectedDateStr) => {
    setMedicines((prevMedicines) => {
      const updatedMedicines = { ...prevMedicines };
      const timeOfDayMedicines =
        updatedMedicines[selectedDateStr]?.[updatedMedicine.timeOfDay] || [];
      const updatedTimeOfDayMedicines = timeOfDayMedicines.map((medicine) =>
        medicine.id === updatedMedicine.id ? updatedMedicine : medicine
      );

      updatedMedicines[selectedDateStr] = {
        ...updatedMedicines[selectedDateStr],
        [updatedMedicine.timeOfDay]: updatedTimeOfDayMedicines,
      };
      return updatedMedicines;
    });
    setEditingMedicine(null);
  };

  const handleEditMedicine = (medicine) => {
    setEditingMedicine(medicine);
    navigation.navigate('AddMedicine', {
      editingMedicine: medicine,
      timeOfDay: medicine.timeOfDay,
      selectedDate: format(selectedDate, 'yyyy-MM-dd'),
    });
  };

  const handleDeleteMedicine = (medicine) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this medicine?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteMedicine(medicine) },
      ]
    );
  };

  const deleteMedicine = (medicine) => {
    const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
    setMedicines((prevMedicines) => {
      const updatedMedicines = { ...prevMedicines };
      const timeOfDayMedicines =
        updatedMedicines[selectedDateStr]?.[medicine.timeOfDay] || [];
      const updatedTimeOfDayMedicines = timeOfDayMedicines.filter(
        (item) => item.id !== medicine.id
      );

      if (updatedTimeOfDayMedicines.length === 0) {
        delete updatedMedicines[selectedDateStr][medicine.timeOfDay];
      } else {
        updatedMedicines[selectedDateStr][medicine.timeOfDay] =
          updatedTimeOfDayMedicines;
      }

      if (Object.keys(updatedMedicines[selectedDateStr]).length === 0) {
        delete updatedMedicines[selectedDateStr];
      }

      return updatedMedicines;
    });
  };

  const renderMedicine = ({ item }) => (
    <View style={styles.medicineContainer}>
      <Text style={styles.medicineText}>{item.name}</Text>
      <Text style={styles.medicineSubText}>{item.dosage}</Text>
      <Text style={styles.medicineTimeText}>
        Time: {new Date(item.time).toLocaleTimeString()}
      </Text>
      <View style={styles.editDeleteContainer}>
        <TouchableOpacity onPress={() => handleEditMedicine(item)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteMedicine(item)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSection = (timeOfDay) => {
    const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
    const medicinesForTimeOfDay = medicines[selectedDateStr]?.[timeOfDay] || [];

    let iconName;
    switch (timeOfDay) {
      case 'Morning':
        iconName = 'sunny-outline';
        break;
      case 'Afternoon':
        iconName = 'partly-sunny-outline';
        break;
      case 'Evening':
        iconName = 'moon-outline';
        break;
      default:
        iconName = 'time-outline';
    }

    return (
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons
              name={iconName}
              size={24}
              color="#1D8CF8"
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>{timeOfDay}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddMedicine', { timeOfDay })}>
            <Text style={styles.addButton}>+</Text>
          </TouchableOpacity>
        </View>
        {medicinesForTimeOfDay.length > 0 ? (
          <FlatList
            data={medicinesForTimeOfDay}
            renderItem={renderMedicine}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.placeholder}>
            No medicines scheduled for {timeOfDay.toLowerCase()}.
          </Text>
        )}
      </View>
    );
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeTabs')}
              style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </TouchableOpacity>
            <View style={styles.datePickerContainer}>
              <TouchableOpacity
                onPress={showDatePicker}
                style={styles.dateButton}>
                <Text style={styles.dateText}>
                  {format(selectedDate, 'MMMM dd, yyyy')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          {renderSection('Morning')}
          {renderSection('Afternoon')}
          {renderSection('Evening')}
        </>
      }
      data={[]}
      renderItem={() => null} // Empty render function to prevent the flatlist from rendering its own items
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    paddingTop: 80,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  datePickerContainer: {
    marginLeft: 55,
    marginRight: 30,
  },
  dateButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1D8CF8',
    borderRadius: 10,
  },
  dateText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    fontSize: 30,
    color: '#1D8CF8',
  },
  medicineContainer: {
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  medicineText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  medicineSubText: {
    fontSize: 14,
    color: '#666',
  },
  placeholder: {
    fontSize: 16,
    color: '#AAA',
    textAlign: 'center',
    marginVertical: 10,
  },
  editDeleteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    fontSize: 16,
    color: '#1D8CF8',
  },
  deleteButton: {
    fontSize: 16,
    color: '#F44336',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 10,
  },
});
