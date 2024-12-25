import { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';

import exercises from "../../../../assets/dataset/exercises";

export default function ExercisesScreen({ navigation }) {

  const itemView = ({ item }) => (
    <TouchableOpacity
      style={styles.exerciseContainer}
      onPress={() => navigation.navigate('ExercisesDetails', item)}
    >
      <Image
        source={item.image}
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
      <FlatList
        data={exercises}
        keyExtractor={item => item.id.toString()}
        renderItem={itemView}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#f5f5f5'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 'auto'
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
    elevation: 3
  },

  exerciseImage: {
    width: 115,
    height: 100,
    borderRadius: 10,
    marginRight: 15
  },

  exerciseInfo: {
    flex: 1
  },

  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },

  exerciseDifficulty: {
    fontSize: 16,
    color: '#333333'
  }
  
});