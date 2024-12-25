import { useEffect } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function ExercisesDetailsScreen({ route, navigation }) {
    
  const exercise = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: exercise.name
    });

  }, [])

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
  }

  return (
    <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
    >
      <Image
        source={exercise.image}
        style={styles.image}
      />
      <Text style={styles.difficulty}>Difficulty: {exercise.difficulty}</Text>
      <Text style={styles.description}>{exercise.description}</Text>
      <Text style={styles.stepsTitle}>Steps:</Text>
      {
        exercise.steps.map((item, index) => {
            return (
                <View key={index.toString()}>
                    <Text style={styles.step}>{`${index + 1}. ${item}`}</Text>
                </View>
            );
        })
      }
      {exercise.videoLink && (
        <TouchableOpacity
            onPress={() => openVideoLink(exercise.videoLink)}
            style={styles.videoButton}
        >
            <Ionicons
                name="play-circle-outline"
                size={20}
                color="#FFF" style={styles.icon}
            />
          <Text style={styles.videoButtonText}>Watch Video</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24, 
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 'auto'
  },

  image: {
    width: 310, 
    height: 250, 
    alignSelf: 'center', 
    borderRadius: 10,
    marginBottom: 20
  },

  difficulty: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333333'
  },

  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666666',
    textAlign:'justify'
  },

  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  step: {
    fontSize: 16,
    marginBottom: 5
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
    alignSelf: 'center'
  },

  icon: {
    marginRight: 8
  },

  videoButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
  
});