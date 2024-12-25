import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

const AudioScreen = ({navigation, route}) => {
  const [sound, setSound] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [progress, setProgress] = useState(0);

  const genres = route.params.data;

  useEffect(() => {
    navigation.setOptions({
        title: route.params.name
    });
  }, [])

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPlaybackStatus(status);
      setProgress(status.positionMillis / status.durationMillis);
    }
  };

  const formatTime = (millis) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const playAudio = async (audioFile, id) => {
    if (currentAudio && currentAudio !== id) {
      await sound.stopAsync();
      setIsPlaying(false);
    }

    if (currentAudio === id && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      const { sound } = await Audio.Sound.createAsync(audioFile);
      setSound(sound);
      await sound.playAsync();
      setIsPlaying(true);
      setCurrentAudio(id);
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      setCurrentAudio(null);
      setProgress(0);
    }
  };

  const onResume = async () => {
    if (sound && playbackStatus.isLoaded) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const onSeek = async (value) => {
    if (sound && playbackStatus.isLoaded) {
      await sound.setPositionAsync(value * playbackStatus.durationMillis);
      setProgress(value);
    }
  };

  const onSeekForward = async () => {
    if (sound && playbackStatus.isLoaded) {
      const newPosition = playbackStatus.positionMillis + 5000;
      if (newPosition < playbackStatus.durationMillis) {
        await sound.setPositionAsync(newPosition);
      }
    }
  };

  const onSeekBackward = async () => {
    if (sound && playbackStatus.isLoaded) {
      const newPosition = playbackStatus.positionMillis - 5000;
      if (newPosition > 0) {
        await sound.setPositionAsync(newPosition);
      }
    }
  };

  const renderGenre = ({ item }) => (
    <View style={styles.genreSection}>
      <Text style={styles.genreTitle}>{item.genre}</Text>
      {item.books.map((book) => (
        <TouchableOpacity
          key={book.id}
          style={styles.audioBookItem}
          onPress={() => playAudio(book.audioFile, book.id)}
        >
          <Text style={styles.audioBookTitle}>{book.title}</Text>
          <Text style={styles.audioBookAuthor}>{book.author}</Text>
          <Text style={styles.audioBookStatus}>
            {currentAudio === book.id ? (isPlaying ? 'Playing' : 'Paused') : 'Tap to Play'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const currentBook = genres
  .flatMap((genre) => genre.books)
  .find((book) => book.id === currentAudio);

  return (
    <View style={styles.container}>
      {
        currentAudio && (
          <View style={styles.controls}>
          {
            currentBook && (
              <View style={styles.currentBookInfo}>
                <Text style={styles.currentBookTitle}>{currentBook.title}</Text>
                <Text style={styles.currentBookAuthor}>Tác giả: {currentBook.author}</Text>
              </View>
            )
          }
              <Slider
                style={styles.slider}
                value={progress}
                minimumValue={0}
                maximumValue={1}
                onValueChange={onSeek}
                thumbTintColor="#1D8CF8"
                minimumTrackTintColor="#1D8CF8"
                maximumTrackTintColor="#ccc"
              />
              <View style={styles.timeDisplay}>
                <Text>{playbackStatus ? formatTime(playbackStatus.positionMillis) : '0:00'}</Text>
                <Text>{playbackStatus ? formatTime(playbackStatus.durationMillis) : '0:00'}</Text>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity onPress={onSeekBackward} style={styles.controlButton}>
                  <Ionicons name="play-back" size={30} color="#1D8CF8" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onResume} style={styles.controlButton}>
                  <Ionicons name={isPlaying ? 'pause' : 'play'} size={30} color="#1D8CF8" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onSeekForward} style={styles.controlButton}>
                  <Ionicons name="play-forward" size={30} color="#1D8CF8" />
                </TouchableOpacity>
                <TouchableOpacity onPress={stopAudio} style={styles.controlButton}>
                  <Ionicons name="square" size={30} color="#F44336" />
                </TouchableOpacity>
              </View>
          </View>
        )
      }
      <FlatList
        showsVerticalScrollIndicator={false}
        data={genres}
        renderItem={renderGenre}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  controls: {
    marginVertical: 20,
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  controlButton: {
    padding: 10,
    marginHorizontal: 15,
  },
  genreSection: {
    marginBottom: 20,
  },
  genreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D8CF8',
    marginBottom: 10,
  },
  audioBookItem: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  audioBookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  audioBookAuthor: {
    fontSize: 16,
    color: '#777',
  },
  audioBookStatus: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  currentBookInfo: {
    alignItems: 'center',
    marginBottom: 10,
  },
  currentBookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  currentBookAuthor: {
    fontSize: 16,
    color: '#555',
  },
});

export default AudioScreen;