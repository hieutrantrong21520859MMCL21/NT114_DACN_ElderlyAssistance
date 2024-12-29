import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../../server/firebase'; // Firebase config
import { updateProfile } from 'firebase/auth';

export default function EditingProfileScreen({ navigation }) {
  const [name, setName] = useState(auth.currentUser?.displayName || '');
  const [avatar, setAvatar] = useState(auth.currentUser?.photoURL || 'https://via.placeholder.com/150');

  const handleAvatarChange = async() => {
    // Mở Image Picker để chọn ảnh từ thư viện
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied!', 'Permission to camera is not granted!');
      return;
    }

    const resp = await ImagePicker.launchImageLibraryAsync();
    setAvatar(resp.assets[0].uri);
  };

  const handleSave = () => {
    if (!name || !avatar) {
      Alert.alert("Error", "Please update your profile before saving.");
      return;
    }
    // Cập nhật thông tin người dùng trong Firebase
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: avatar,
    })
      .then(() => {
        Alert.alert("Profile updated", "Your profile has been updated successfully.");
        navigation.goBack(); // Quay lại màn hình trước
      })
      .catch((error) => {
        console.log("Error updating profile: ", error);
        Alert.alert("Error", "There was an issue updating your profile.");
      });
  };

  return (
    <View style={styles.container}>
      {/* Avatar section */}
      <TouchableOpacity onPress={handleAvatarChange} style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.cameraIcon}>
          <Text style={styles.cameraText}>✎</Text>
        </View>
      </TouchableOpacity>

      {/* Input to change name */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor="#888"
      />

      {/* Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 8,
    borderWidth: 2,
    borderColor: '#888',
  },
  cameraText: {
    fontSize: 16,
    color: '#888',
  },
  input: {
    width: '80%',
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});