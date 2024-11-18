import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import exercisesData from '../assets/exercises.json';
import { Ionicons } from '@expo/vector-icons';

export default function ExerciseScreen({ navigation }) {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    setExercises(exercisesData);
  }, []);

  const getImageSource = (imageName) => {
    switch (imageName) {
      case 'standing.png':
        return require('../assets/images/standing_from_chair.png');
      case 'tandem.png':
        return require('../assets/images/tandem_stance.png');
      case 'single_leg.png':
        return require('../assets/images/single_leg_stance.png');
      case 'wall_push.png':
        return require('../assets/images/wall_push_ups.png');
      case 'standing_marches.png':
        return require('../assets/images/standing_marches.png');
      default:
        return null;
    }
  };

  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.exerciseContainer}
      onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
    >
      <Image
        source={getImageSource(item.image)}
        style={styles.exerciseImage}
      />
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseDifficulty}>Difficulty: {item.difficulty}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Tiêu đề với nút back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Exercise List</Text>
      </View>

      {/* Danh sách bài tập */}
      <FlatList
        data={exercises}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<Text style={styles.listHeader}></Text>} // Có thể thêm nội dung ở đây nếu cần
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0, 
  },
  backButton: {
    paddingTop: 45,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 45,
    marginLeft: 85,
  },
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  exerciseImage: {
    width: 115,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exerciseDifficulty: {
    fontSize: 16,
    color: '#333333',
  },
});
