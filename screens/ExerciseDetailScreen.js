import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ExerciseDetailScreen({ route, navigation }) {
  const { exercise } = route.params;

  const images = {
    'standing.png': require('../assets/images/standing_from_chair.png'),
    'tandem.png': require('../assets/images/tandem_stance.png'),
    'single_leg.png': require('../assets/images/single_leg_stance.png'),
    'wall_push.png': require('../assets/images/wall_push_ups.png'),
    'standing_marches.png': require('../assets/images/standing_marches.png'),
  };

  const getImageSource = (imageName) => images[imageName] || null;

  const openVideoLink = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          alert('Cannot open this video link.');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Tiêu đề và nút back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{exercise.name}</Text>
      </View>

      <Image
        source={getImageSource(exercise.image)}
        style={styles.image}
      />
      <Text style={styles.difficulty}>Difficulty: {exercise.difficulty}</Text>
      <Text style={styles.description}>{exercise.description}</Text>
      <Text style={styles.stepsTitle}>Steps:</Text>
      <FlatList
        data={exercise.steps}
        renderItem={({ item, index }) => (
          <Text style={styles.step}>{`${index + 1}. ${item}`}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false} 
      />

      {/* Nút mở video nếu có liên kết */}
      {exercise.videoLink && (
        <TouchableOpacity
          style={styles.videoButton}
          onPress={() => openVideoLink(exercise.videoLink)}
        >
          <Ionicons name="play-circle-outline" size={20} color="#FFF" style={styles.icon} />
          <Text style={styles.videoButtonText}>Watch Video</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    marginBottom: 20, 
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1, 
    marginLeft: 27, 
  },
  image: {
    width: 310, 
    height: 250, 
    alignSelf: 'center', 
    borderRadius: 10,
    marginBottom: 20,
  },
  difficulty: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333333',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666666',
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  step: {
    fontSize: 16,
    marginBottom: 5,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D8CF8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: 200,
    alignSelf: 'center',
  },
  icon: {
    marginRight: 8,
  },
  videoButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
